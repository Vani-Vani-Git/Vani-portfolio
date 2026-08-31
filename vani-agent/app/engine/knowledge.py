import json
from pathlib import Path
from typing import Any


BASE_DIR = Path(__file__).resolve().parents[2]
KNOWLEDGE_DIR = BASE_DIR / "knowledge"


def load_json(filename: str) -> Any:
    path = KNOWLEDGE_DIR / filename

    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def load_projects() -> list[dict]:
    return load_json("projects.json")


def load_profile() -> dict:
    return load_json("profile.json")


def normalize(text: str) -> str:
    return " ".join(
        text.lower().strip().split()
    )


def score_project(
    project: dict,
    message: str
) -> int:

    query = normalize(message)

    score = 0

    name = normalize(
        project["name"]
    )

    # Exact project name
    if name in query:
        score += 20

    # Project keywords
    for keyword in project.get(
        "keywords",
        []
    ):

        keyword = normalize(
            keyword
        )

        if keyword in query:
            score += 5

    # Technologies
    for technology in project.get(
        "technologies",
        []
    ):

        technology = normalize(
            technology
        )

        if technology in query:
            score += 3

    return score


def find_relevant_projects(
    message: str
) -> list[dict]:

    projects = load_projects()

    ranked = []

    for project in projects:

        score = score_project(
            project,
            message
        )

        if score > 0:

            ranked.append(
                (score, project)
            )

    ranked.sort(
        key=lambda item: item[0],
        reverse=True
    )

    return [
        project
        for _, project
        in ranked
    ]


def find_project_by_id(
    project_id: str
) -> dict | None:

    projects = load_projects()

    for project in projects:

        if project["id"] == project_id:
            return project

    return None


def find_project(
    message: str
) -> dict | None:

    projects = find_relevant_projects(
        message
    )

    if not projects:
        return None

    return projects[0]


def search_project_content(
    project: dict,
    message: str
) -> list[str]:

    """
    Searches the selected project's
    summary, technologies and details
    for information relevant to the
    user's question.
    """

    query_words = set(
        normalize(message).split()
    )

    matches = []

    summary = project.get(
        "summary",
        ""
    )

    summary_words = set(
        normalize(summary).split()
    )

    if query_words.intersection(
        summary_words
    ):
        matches.append(summary)

    for technology in project.get(
        "technologies",
        []
    ):

        technology_normalized = normalize(
            technology
        )

        if technology_normalized in normalize(
            message
        ):
            matches.append(
                technology
            )

    for detail in project.get(
        "details",
        []
    ):

        detail_words = set(
            normalize(detail).split()
        )

        # Look for meaningful overlap
        # while avoiding very common words.
        useful_words = {
            word
            for word in query_words
            if len(word) >= 4
        }

        if useful_words.intersection(
            detail_words
        ):
            matches.append(detail)

    return matches


def find_profile_information(
    message: str
) -> dict:

    profile = load_profile()

    text = normalize(message)

    result = {
        "name": profile.get("name"),
        "matched_sections": []
    }

    if any(word in text for word in [
        "skill",
        "skills",
        "technology",
        "technologies",
        "programming",
        "technical"
    ]):

        result["matched_sections"].append(
            "skills"
        )

    if any(word in text for word in [
        "education",
        "degree",
        "college",
        "university",
        "study",
        "studied"
    ]):

        result["matched_sections"].append(
            "education"
        )

    if any(word in text for word in [
        "experience",
        "internship",
        "intern",
        "worked",
        "work"
    ]):

        result["matched_sections"].append(
            "experience"
        )

    if any(word in text for word in [
        "certification",
        "certificate",
        "nptel",
        "course"
    ]):

        result["matched_sections"].append(
            "certifications"
        )

    if any(word in text for word in [
        "achievement",
        "achievements",
        "award",
        "accomplishment"
    ]):

        result["matched_sections"].append(
            "achievements"
        )

    return result