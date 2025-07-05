from __future__ import annotations

import json
import uuid
from datetime import datetime
from typing import Dict, Any, List


def compute_ratio(goal: float, actual: float) -> float:
    if goal <= 0:
        return 0.0
    return actual / goal


def compute_pillar_average(ratings: List[float]) -> float:
    if not ratings:
        return 0.0
    return sum(ratings) / len(ratings)


def compute_qualitative_score(pillar_average: float) -> float:
    return pillar_average * 12


def compute_quantitative_score(ratios: List[float]) -> float:
    if not ratios:
        return 0.0
    avg_ratio = sum(ratios) / len(ratios)
    score = avg_ratio * 20
    return min(score, 20)


def compute_discretionary_score(discretionary: float) -> float:
    return discretionary * 4


def compute_performance_index_score(qualitative: float, quantitative: float, discretionary: float) -> float:
    return qualitative + quantitative + discretionary


def generate_report_id() -> str:
    return str(uuid.uuid4())


def current_timestamp() -> str:
    return datetime.utcnow().isoformat() + "Z"


def generate_scorecard(input_payload: Dict[str, Any]) -> Dict[str, Any]:
    quantitative = input_payload.get("quantitativeMetrics", {})
    sales_ratio = compute_ratio(quantitative.get("salesCalls", {}).get("goal", 0),
                                quantitative.get("salesCalls", {}).get("actual", 0))
    referrals_ratio = compute_ratio(quantitative.get("referrals", {}).get("goal", 0),
                                    quantitative.get("referrals", {}).get("actual", 0))
    admissions_ratio = compute_ratio(quantitative.get("admissions", {}).get("goal", 0),
                                     quantitative.get("admissions", {}).get("actual", 0))

    ratios = [sales_ratio, referrals_ratio, admissions_ratio]

    # Placeholder ratings from trainer notes - default to 3
    ratings = [3.0] * 5
    pillar_average = compute_pillar_average(ratings)

    qualitative_score = compute_qualitative_score(pillar_average)
    quantitative_score = compute_quantitative_score(ratios)
    discretionary_score = compute_discretionary_score(input_payload.get("discretionaryCoachScore", 0))

    performance_index = compute_performance_index_score(
        qualitative_score, quantitative_score, discretionary_score
    )

    scorecard = {
        "schemaVersion": "1.0.0",
        "reportId": generate_report_id(),
        "generatedAt": current_timestamp(),
        "inputSnapshot": input_payload,
        "growthAndActionPlan": {
            "pillarRatings": ratings,
        },
        "privateTrainerAnalysis": {
            "performanceIndexScore": performance_index,
            "calculationBreakdown": {
                "pillarAverage": pillar_average,
                "qualitativeScore": qualitative_score,
                "quantitativeScore": quantitative_score,
                "discretionaryScore": discretionary_score,
            },
        },
    }
    return scorecard
