import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / "src"))
import math
from coachai import scorecard


def test_compute_ratio():
    assert scorecard.compute_ratio(10, 5) == 0.5
    assert scorecard.compute_ratio(0, 5) == 0.0


def test_pillar_average():
    ratings = [3, 4, 5]
    assert math.isclose(scorecard.compute_pillar_average(ratings), 4.0)


def test_scores():
    ratios = [1.0, 0.5, 0.0]
    pillar_avg = 3.0
    qualitative = scorecard.compute_qualitative_score(pillar_avg)
    quantitative = scorecard.compute_quantitative_score(ratios)
    discretionary = scorecard.compute_discretionary_score(4)
    performance = scorecard.compute_performance_index_score(
        qualitative, quantitative, discretionary
    )
    assert qualitative == 36
    assert quantitative == 10
    assert discretionary == 16
    assert performance == 62
