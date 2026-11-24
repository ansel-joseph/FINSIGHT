
from fastapi import FastAPI, UploadFile, File, HTTPException
import pandas as pd
from io import BytesIO

from preprocessing.cleaner import clean_transactions
from analytics.summary import calculate_summary


app = FastAPI(
    title="FINSIGHT API",
    description="AI-Powered Personal Financial Intelligence System",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "project": "FINSIGHT",
        "status": "Operational",
        "message": "Financial Intelligence System is running."
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/transactions/upload")
async def upload_transactions(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a CSV file."
        )

    try:
        contents = await file.read()
        df = pd.read_csv(BytesIO(contents))

        cleaned_df = clean_transactions(df)

        # Calculate financial summary
        summary = calculate_summary(cleaned_df)

        return {
            "message": "Transactions uploaded and analysed successfully.",
            "total_transactions": len(cleaned_df),
            "summary": summary,
            "transactions": cleaned_df.astype(
                {"date": str}
            ).to_dict(orient="records")
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception as error:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to process file: {str(error)}"
        )
