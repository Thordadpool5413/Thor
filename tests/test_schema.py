import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / "src"))
import json
from jsonschema import validate
from coachai import scorecard
from pathlib import Path

SCHEMA_PATH = Path("schema/hospiceScorecard.schema.json")


def load_schema():
    with open(SCHEMA_PATH) as f:
        return json.load(f)


def example_input():
    return {
        "repName": "Jane Doe",
        "reportDate": "2024-01-01",
        "trainerNotes": {
            "preCallPlanning": "solid work",
            "consultativeSalesModel": "good job",
            "clinicalAcumenAndValue": "nice",
            "territoryManagement": "ok",
            "mindsetAndProfessionalism": "great"
        },
        "quantitativeMetrics": {
            "salesCalls": {"goal": 10, "actual": 8, "reasonIfMissed": ""},
            "referrals": {"goal": 5, "actual": 4, "reasonIfMissed": ""},
            "admissions": {"goal": 3, "actual": 2, "reasonIfMissed": ""}
        },
        "discretionaryCoachScore": 4
    }


def test_generate_scorecard_schema():
    data = example_input()
    card = scorecard.generate_scorecard(data)
    schema = load_schema()
    validate(card, schema)
