
import pandas as pd


def clean_transactions(df: pd.DataFrame) -> pd.DataFrame:
    """
    Cleans and standardizes financial transaction data.
    """

    # Work on a copy to avoid modifying the original DataFrame
    df = df.copy()

    # Standardize column names
    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
    )

    # Check required columns
    required_columns = ["date", "description", "amount", "type"]

    for column in required_columns:
        if column not in df.columns:
            raise ValueError(
                f"Missing required column: {column}"
            )

    # Remove duplicate transactions
    df = df.drop_duplicates()

    # Clean descriptions
    df["description"] = (
        df["description"]
        .astype(str)
        .str.strip()
    )

    # Standardize transaction types
    type_mapping = {
        "income": "income",
        "credit": "income",
        "deposit": "income",
        "expense": "expense",
        "debit": "expense",
        "withdrawal": "expense"
    }

    df["type"] = (
        df["type"]
        .astype(str)
        .str.strip()
        .str.lower()
        .map(type_mapping)
    )

    # Reject unknown transaction types
    if df["type"].isna().any():
        raise ValueError(
            "Invalid transaction type. Use income or expense."
        )

    # Convert dates
    df["date"] = pd.to_datetime(
        df["date"],
        errors="coerce"
    )

    # Convert amounts to numeric values
    df["amount"] = pd.to_numeric(
        df["amount"],
        errors="coerce"
    )

    # Remove invalid records
    df = df.dropna(
        subset=["date", "description", "amount"]
    )

    # Standardize amounts as positive values
    df["amount"] = df["amount"].abs()

    # Remove empty descriptions and zero-value transactions
    df = df[
        (df["description"] != "") &
        (df["amount"] > 0)
    ]

    # Sort transactions by date
    df = df.sort_values("date")

    return df.reset_index(drop=True)
