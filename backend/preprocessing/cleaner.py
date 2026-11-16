import pandas as pd


def clean_transactions(df: pd.DataFrame) -> pd.DataFrame:
    """
    Cleans and standardizes financial transaction data.
    """

    # Standardize column names
    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
    )

    # Check required columns
    required_columns = ["date", "description", "amount"]

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

    # Remove empty descriptions
    df = df[df["description"] != ""]

    # Sort transactions by date
    df = df.sort_values("date")

    return df.reset_index(drop=True)
