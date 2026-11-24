
import pandas as pd


def calculate_summary(df: pd.DataFrame) -> dict:
    """
    Calculates basic financial statistics
    from cleaned transaction data.
    """

    # Separate income and expense transactions
    income = df[df["type"] == "income"]
    expenses = df[df["type"] == "expense"]

    # Calculate totals
    total_income = income["amount"].sum()
    total_expenses = expenses["amount"].sum()

    # Calculate net savings
    net_savings = total_income - total_expenses

    # Find the largest expense
    largest_expense = (
        expenses["amount"].max()
        if not expenses.empty
        else 0
    )

    # Return the results
    return {
        "total_income": round(float(total_income), 2),
        "total_expenses": round(float(total_expenses), 2),
        "net_savings": round(float(net_savings), 2),
        "transaction_count": int(len(df)),
        "largest_expense": round(float(largest_expense), 2)
    }
