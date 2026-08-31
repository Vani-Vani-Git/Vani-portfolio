from app.engine.intent import detect_intent, Intent


def test_project_overview():

    result = detect_intent(
        "Tell me about ISL Connect"
    )

    assert result == Intent.PROJECT_OVERVIEW


def test_project_model():

    result = detect_intent(
        "What model does it use?"
    )

    assert result == Intent.PROJECT_MODEL


def test_project_accuracy():

    result = detect_intent(
        "What is the accuracy?"
    )

    assert result == Intent.PROJECT_ACCURACY


def test_education():

    result = detect_intent(
        "What did Vanitha study?"
    )

    assert result == Intent.EDUCATION


def test_skills():

    result = detect_intent(
        "What technical skills does she have?"
    )

    assert result == Intent.SKILLS


def test_project_list():

    result = detect_intent(
        "What projects has Vanitha built?"
    )

    assert result == Intent.PROJECT_LIST