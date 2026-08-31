from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.engine.intent import (
    Intent,
    detect_intent
)

from app.engine.knowledge import (
    find_relevant_projects,
    find_project_by_id,
    load_projects,
    load_profile
)

from app.engine.conversation import (
    get_conversation
)


app = FastAPI(
    title="Vani Personal AI Agent",
    description=(
        "Vanitha's personalized "
        "professional AI agent"
    ),
    version="0.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================================================
# Request / Response Models
# ==================================================

class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    session_id: str
    intent: str
    project: str | None
    reply: str


# ==================================================
# Standard Responses
# ==================================================

UNKNOWN_TOPIC_RESPONSE = (
    "I can't answer this. You can ask me any "
    "other professional-related or Vani "
    "knowledge-related questions."
)

UNKNOWN_PROFESSIONAL_RESPONSE = (
    "I don't currently have enough documented "
    "information to answer that accurately, "
    "and I don't want to guess."
)

UNKNOWN_TECHNOLOGY_RESPONSE = (
    "Not yet. But I'm a fast learner, "
    "and I'm always open to learning new "
    "things and expanding my knowledge."
)


# ==================================================
# Root
# ==================================================

@app.get("/")
def root():

    return {
        "agent": "Vani",
        "status": "online",
        "version": "0.4.0"
    }


# ==================================================
# Project Intent Helper
# ==================================================

def is_project_intent(
    intent: Intent
) -> bool:

    return intent in [
        Intent.PROJECT_OVERVIEW,
        Intent.PROJECT_TECHNOLOGIES,
        Intent.PROJECT_MODEL,
        Intent.PROJECT_FEATURES,
        Intent.PROJECT_ACCURACY,
        Intent.PROJECT_ARCHITECTURE
    ]


# ==================================================
# Project Detection
# ==================================================

def detect_project(
    message: str,
    conversation,
    intent: Intent
):

    # --------------------------------------------------
    # Only project-related questions should use
    # project context.
    # --------------------------------------------------

    if not is_project_intent(intent):

        return None

    # --------------------------------------------------
    # First try to identify a project from the
    # current message.
    # --------------------------------------------------

    projects = find_relevant_projects(
        message
    )

    if projects:

        project = projects[0]

        conversation.set_project(
            project["id"]
        )

        return project

    # --------------------------------------------------
    # If the current message does not mention a
    # project, use the project remembered from
    # the current conversation.
    #
    # Example:
    #
    # User: Tell me about IrisAPI
    # User: Tell me more about it
    #
    # "it" should resolve to IrisAPI.
    # --------------------------------------------------

    if conversation.current_project:

        return find_project_by_id(
            conversation.current_project
        )

    return None


# ==================================================
# Find Known Technology
# ==================================================

def find_known_technology(
    message: str,
    profile: dict
) -> str | None:

    text = message.lower()

    skills = profile.get(
        "skills",
        {}
    )

    for category in skills.values():

        if not isinstance(
            category,
            list
        ):
            continue

        for technology in category:

            if technology.lower() in text:

                return technology

    return None


# ==================================================
# Knowledge Check
# ==================================================

def answer_knowledge_check(
    message: str,
    conversation
) -> str:

    profile = load_profile()

    known_technology = find_known_technology(
        message,
        profile
    )

    if known_technology:

        return (
            f"Yes, I know {known_technology}."
        )

    return UNKNOWN_TECHNOLOGY_RESPONSE


# ==================================================
# About Vani
# ==================================================

def answer_about_vanitha() -> str:

    profile = load_profile()

    name = profile.get(
        "name",
        "Vanitha"
    )

    title = profile.get(
        "professional_title",
        ""
    )

    summary = profile.get(
        "summary",
        ""
    )

    return (
        f"Hi, I'm Vani! I'm the professional "
        f"AI version of {name}. "
        f"I'm {title}. "
        f"{summary}"
    )


# ==================================================
# Project List / Project Count
# ==================================================

def answer_project_list(
    message: str = ""
) -> str:

    projects = load_projects()

    if not projects:

        return UNKNOWN_PROFESSIONAL_RESPONSE

    count = len(projects)

    text = message.lower()

    # --------------------------------------------------
    # Count question
    # --------------------------------------------------

    if (
        "how many" in text
        or "number of" in text
        or "count" in text
    ):

        return (
            f"I've worked on {count} documented "
            f"projects in my current portfolio."
        )

    # --------------------------------------------------
    # Project list
    # --------------------------------------------------

    names = [
        project["name"]
        for project in projects
    ]

    return (
        "My documented projects include: "
        + ", ".join(names)
        + "."
    )


# ==================================================
# Project Overview
# ==================================================

def answer_project_overview(
    project: dict,
    detailed: bool = False
) -> str:

    name = project.get(
        "name",
        "This project"
    )

    summary = project.get(
        "summary",
        ""
    )

    # --------------------------------------------------
    # Normal overview
    #
    # Example:
    # "Tell me about IrisAPI"
    # --------------------------------------------------

    if not detailed:

        if summary:

            return (
                f"{name} is {summary}"
            )

        return (
            f"I don't currently have enough "
            f"documented information about "
            f"{name} to explain it accurately."
        )

    # --------------------------------------------------
    # Detailed overview
    #
    # Example:
    # "Tell me more about it"
    # --------------------------------------------------

    technologies = project.get(
        "technologies",
        []
    )

    details = project.get(
        "details",
        []
    )

    knowledge_limit = project.get(
        "knowledge_limit"
    )

    response = []

    # --------------------------------------------------
    # Introduction
    # --------------------------------------------------

    if summary:

        response.append(
            f"{name} is {summary}"
        )

    # --------------------------------------------------
    # Technologies
    # --------------------------------------------------

    if technologies:

        response.append(
            "I built it using "
            + ", ".join(technologies)
            + "."
        )

    # --------------------------------------------------
    # Main documented details
    # --------------------------------------------------

    if details:

        response.append(
            "Here are the main documented "
            "details about it:"
        )

        response.extend(
            f"• {detail}"
            for detail in details
        )

    # --------------------------------------------------
    # Knowledge limitation
    # --------------------------------------------------

    if knowledge_limit:

        response.append(
            "One thing I want to be transparent "
            f"about: {knowledge_limit}"
        )

    # --------------------------------------------------
    # No information
    # --------------------------------------------------

    if not response:

        return (
            f"I don't currently have enough "
            f"documented information about "
            f"{name} to explain it accurately."
        )

    return "\n".join(
        response
    )


# ==================================================
# Project Technologies
# ==================================================

def answer_project_technologies(
    project: dict
) -> str:

    technologies = project.get(
        "technologies",
        []
    )

    if not technologies:

        return (
            f"I don't currently have the "
            f"documented technology details "
            f"for {project['name']}."
        )

    return (
        f"For {project['name']}, I used: "
        + ", ".join(technologies)
        + "."
    )


# ==================================================
# Project Model
# ==================================================

def answer_project_model(
    project: dict
) -> str:

    model = project.get(
        "model"
    )

    if not model:

        return (
            f"I don't currently have enough "
            f"documented information to give "
            f"you the exact model I used in "
            f"{project['name']}. "
            f"I don't want to guess."
        )

    name = model.get(
        "name"
    )

    description = model.get(
        "description"
    )

    sequence_length = model.get(
        "sequence_length"
    )

    response_parts = []

    if name:

        response_parts.append(
            f"I used {name} for "
            f"{project['name']}."
        )

    if description:

        response_parts.append(
            description
        )

    if sequence_length:

        response_parts.append(
            f"The model works with "
            f"{sequence_length}-frame sequences."
        )

    if not response_parts:

        return (
            f"I don't currently have enough "
            f"documented information about "
            f"the model used in {project['name']}."
        )

    return " ".join(
        response_parts
    )


# ==================================================
# Project Accuracy
# ==================================================

def answer_project_accuracy(
    project: dict
) -> str:

    evaluation = project.get(
        "evaluation"
    )

    if not evaluation:

        return (
            f"I don't currently have a "
            f"documented accuracy result for "
            f"{project['name']}, so I don't "
            f"want to guess."
        )

    metric = evaluation.get(
        "reported_metric"
    )

    value = evaluation.get(
        "reported_value"
    )

    limitation = evaluation.get(
        "limitation"
    )

    if not metric or not value:

        return (
            f"I don't currently have enough "
            f"documented evaluation information "
            f"for {project['name']} to answer "
            f"that accurately."
        )

    response = (
        f"The current portfolio reports "
        f"{value} {metric} for "
        f"{project['name']}."
    )

    if limitation:

        response += (
            f" {limitation}"
        )

    return response


# ==================================================
# Project Features
# ==================================================

def answer_project_features(
    project: dict
) -> str:

    details = project.get(
        "details",
        []
    )

    if not details:

        return (
            f"I don't currently have enough "
            f"documented information about "
            f"the features of {project['name']}."
        )

    return (
        f"The documented capabilities of "
        f"{project['name']} include: "
        + " ".join(details)
    )


# ==================================================
# Project Architecture
# ==================================================

def answer_project_architecture(
    project: dict
) -> str:

    details = project.get(
        "details",
        []
    )

    architecture_keywords = [
        "architecture",
        "pipeline",
        "workflow",
        "model",
        "landmark",
        "api",
        "backend",
        "frontend",
        "database",
        "processing",
        "detection",
        "attendance"
    ]

    relevant_details = []

    for detail in details:

        detail_lower = detail.lower()

        if any(
            keyword in detail_lower
            for keyword in architecture_keywords
        ):

            relevant_details.append(
                detail
            )

    if not relevant_details:

        return (
            f"I don't have enough documented "
            f"implementation details to "
            f"describe the architecture of "
            f"{project['name']} accurately."
        )

    return (
        f"Based on what I have documented, "
        f"{project['name']} works as follows: "
        + " ".join(relevant_details)
    )


# ==================================================
# Skills
# ==================================================

def answer_skills(
    message: str = ""
) -> str:

    profile = load_profile()

    skills = profile.get(
        "skills",
        {}
    )

    if not skills:

        return UNKNOWN_PROFESSIONAL_RESPONSE

    # --------------------------------------------------
    # Collect all documented skills
    # --------------------------------------------------

    all_skills = []

    for values in skills.values():

        if not isinstance(
            values,
            list
        ):
            continue

        all_skills.extend(
            values
        )

    text = message.lower()

    # --------------------------------------------------
    # Technology / skill count
    # --------------------------------------------------

    if (
        "how many" in text
        or "number of" in text
        or "count" in text
    ):

        return (
            f"I currently have {len(all_skills)} "
            f"documented skills and technologies "
            f"in my professional profile."
        )

    # --------------------------------------------------
    # Normal skills question
    # --------------------------------------------------

    parts = []

    for category, values in skills.items():

        if not values:
            continue

        formatted_category = (
            category.replace(
                "_",
                " "
            ).title()
        )

        parts.append(
            f"{formatted_category}: "
            + ", ".join(values)
        )

    return (
        "I know and work with: "
        + "; ".join(parts)
        + "."
    )


# ==================================================
# Education
# ==================================================

def answer_education() -> str:

    profile = load_profile()

    education = profile.get(
        "education",
        []
    )

    if not education:

        return UNKNOWN_PROFESSIONAL_RESPONSE

    answers = []

    for item in education:

        degree = item.get(
            "degree"
        )

        institution = item.get(
            "institution"
        )

        period = item.get(
            "period"
        )

        gpa = item.get(
            "gpa"
        )

        sentence = (
            f"I completed/pursued "
            f"{degree} at {institution}"
        )

        if period:

            sentence += (
                f" ({period})"
            )

        if gpa:

            sentence += (
                f", with {gpa}"
            )

        answers.append(
            sentence
        )

    return (
        "My documented education includes: "
        + "; ".join(answers)
        + "."
    )


# ==================================================
# Experience
# ==================================================

def answer_experience() -> str:

    profile = load_profile()

    experience = profile.get(
        "experience",
        []
    )

    if not experience:

        return UNKNOWN_PROFESSIONAL_RESPONSE

    answers = []

    for item in experience:

        role = item.get(
            "role"
        )

        company = item.get(
            "company"
        )

        year = item.get(
            "year"
        )

        location = item.get(
            "location"
        )

        sentence = (
            f"I worked as {role} at {company}"
        )

        if location:

            sentence += (
                f" in {location}"
            )

        if year:

            sentence += (
                f" ({year})"
            )

        answers.append(
            sentence
        )

    return (
        "My documented experience includes: "
        + "; ".join(answers)
        + "."
    )


# ==================================================
# Certifications
# ==================================================

def answer_certifications() -> str:

    profile = load_profile()

    certifications = profile.get(
        "certifications",
        []
    )

    if not certifications:

        return UNKNOWN_PROFESSIONAL_RESPONSE

    return (
        "My documented certifications "
        "and programmes include: "
        + "; ".join(certifications)
        + "."
    )


# ==================================================
# Achievements
# ==================================================

def answer_achievements() -> str:

    profile = load_profile()

    achievements = profile.get(
        "achievements",
        []
    )

    if not achievements:

        return UNKNOWN_PROFESSIONAL_RESPONSE

    return (
        "My documented achievements include: "
        + " ".join(achievements)
    )


# ==================================================
# Contact Information
# ==================================================

def answer_contact_information(
    message: str
) -> str:

    profile = load_profile()

    contact = profile.get(
        "contact",
        {}
    )

    text = message.lower()

    # --------------------------------------------------
    # Email
    # --------------------------------------------------

    if (
        "email" in text
        or "mail" in text
    ):

        email = contact.get(
            "email"
        )

        if email:

            return (
                f"Sure! You can reach me at "
                f"{email}."
            )

        return (
            "My email address isn't currently "
            "available in my profile."
        )

    # --------------------------------------------------
    # Phone / Mobile
    # --------------------------------------------------

    if (
        "phone" in text
        or "mobile" in text
        or "contact number" in text
    ):

        phone = contact.get(
            "phone"
        )

        if phone:

            return (
                f"Sure! You can contact me at "
                f"{phone}."
            )

        return (
            "My phone number isn't currently "
            "available in my profile."
        )

    # --------------------------------------------------
    # GitHub
    # --------------------------------------------------

    if "github" in text:

        github = contact.get(
            "github"
        )

        if github:

            return (
                f"You can find my projects on "
                f"GitHub here: {github}"
            )

        return (
            "My GitHub profile isn't currently "
            "available in my profile."
        )

    # --------------------------------------------------
    # LinkedIn
    # --------------------------------------------------

    if "linkedin" in text:

        linkedin = contact.get(
            "linkedin"
        )

        if linkedin:

            return (
                f"You can connect with me on "
                f"LinkedIn here: {linkedin}"
            )

        return (
            "My LinkedIn profile isn't currently "
            "available in my profile."
        )

    # --------------------------------------------------
    # Location
    # --------------------------------------------------

    if (
        "location" in text
        or "based" in text
        or "where are you" in text
    ):

        location = contact.get(
            "location"
        )

        if location:

            return (
                f"I'm based in {location}."
            )

        return (
            "My current location isn't "
            "available in my profile."
        )

    return UNKNOWN_PROFESSIONAL_RESPONSE

# ==================================================
# Conversational Responses
# ==================================================

def answer_greeting() -> str:

    return (
        "Hi! I'm Vani, Vanitha's personal AI assistant. "
        "I can tell you about her projects, technical skills, "
        "education, experience, certifications, achievements, "
        "and professional background. What would you like to know?"
    )


def answer_thanks() -> str:

    return (
        "You're welcome! Feel free to ask me anything "
        "about my projects, skills, or professional background."
    )


def answer_goodbye() -> str:

    return (
        "Goodbye! It was nice talking with you. "
        "Feel free to come back if you'd like to know more about my work."
    )


def answer_help() -> str:

    return (
        "You can ask me about my projects, technologies, "
        "machine learning work, skills, education, experience, "
        "certifications, achievements, or professional contact "
        "information.\n\n"
        "You can also ask follow-up questions about a project, "
        "such as how it works, what technologies I used, or "
        "what features it has."
    )


def answer_strengths() -> str:

    profile = load_profile()

    skills = profile.get(
        "skills",
        {}
    )

    strengths = []

    programming = skills.get(
        "programming",
        []
    )

    backend = skills.get(
        "backend",
        []
    )

    database = skills.get(
        "database",
        []
    )

    if programming:
        strengths.append(
            "strong programming foundations in "
            + ", ".join(programming)
        )

    if backend:
        strengths.append(
            "backend development with "
            + ", ".join(backend)
        )

    if database:
        strengths.append(
            "working with databases and SQL"
        )

    strengths.append(
        "hands-on experience through practical projects"
    )

    strengths.append(
        "a willingness to learn new technologies"
    )

    return (
        "My main professional strengths include:\n\n"
        + "\n".join(
            f"• {strength}"
            for strength in strengths
        )
    )


def answer_hiring() -> str:

    profile = load_profile()

    title = profile.get(
        "professional_title",
        "software engineer"
    )

    summary = profile.get(
        "summary",
        ""
    )

    achievements = profile.get(
        "achievements",
        []
    )

    response = (
        f"I'd describe Vanitha as a {title} with a "
        "practical, project-focused approach to software development."
    )

    if summary:
        response += f"\n\n{summary}"

    response += (
        "\n\nWhat stands out is the combination of hands-on "
        "development experience, academic foundation, and "
        "willingness to learn and work with new technologies."
    )

    if achievements:

        response += (
            "\n\nHer documented work includes:\n"
            + "\n".join(
                f"• {achievement}"
                for achievement in achievements
            )
        )

    return response

# ==================================================
# Main Answer Router
# ==================================================

def answer_question(
    message: str,
    intent: Intent,
    project: dict | None,
    conversation
) -> str:

        # --------------------------------------------------
    # Conversational intents
    # --------------------------------------------------

    if intent == Intent.GREETING:

        return answer_greeting()

    if intent == Intent.THANKS:

        return answer_thanks()

    if intent == Intent.GOODBYE:

        return answer_goodbye()

    if intent == Intent.HELP:

        return answer_help()

    if intent == Intent.STRENGTHS:

        return answer_strengths()

    if intent == Intent.HIRING:

        return answer_hiring()

    # --------------------------------------------------
    # Personal questions
    # --------------------------------------------------

    if intent == Intent.PERSONAL_QUESTION:

        return UNKNOWN_TOPIC_RESPONSE

    # --------------------------------------------------
    # Knowledge checks
    # --------------------------------------------------

    if intent == Intent.KNOWLEDGE_CHECK:

        return answer_knowledge_check(
            message,
            conversation
        )

    # --------------------------------------------------
    # Contact information
    # --------------------------------------------------

    if intent == Intent.CONTACT_INFORMATION:

        return answer_contact_information(
            message
        )

    # --------------------------------------------------
    # About me
    # --------------------------------------------------

    if intent == Intent.ABOUT_VANITHA:

        return answer_about_vanitha()

    # --------------------------------------------------
    # Project list / count
    # --------------------------------------------------

    if intent == Intent.PROJECT_LIST:

        return answer_project_list(
            message
        )

    # --------------------------------------------------
    # Profile information
    # --------------------------------------------------

    if intent == Intent.SKILLS:

        return answer_skills(
            message
        )

    if intent == Intent.EDUCATION:

        return answer_education()

    if intent == Intent.EXPERIENCE:

        return answer_experience()

    if intent == Intent.CERTIFICATIONS:

        return answer_certifications()

    if intent == Intent.ACHIEVEMENTS:

        return answer_achievements()

    # --------------------------------------------------
    # Project-specific questions
    # --------------------------------------------------

    if is_project_intent(intent):

        if not project:

            return (
                "I couldn't identify which project "
                "you're asking about. Please mention "
                "the project name."
            )

        # --------------------------------------------------
        # Overview
        # --------------------------------------------------

        if intent == Intent.PROJECT_OVERVIEW:

            text = message.lower()

            detailed = any(
                phrase in text
                for phrase in [
                    "tell me more",
                    "tell me more about it",
                    "tell me more about this",
                    "explain it more",
                    "explain this more",
                    "give me more details",
                    "give me more information",
                    "more about it",
                    "more about this",
                    "tell me about it"
                ]
            )

            return answer_project_overview(
                project,
                detailed=detailed
            )

        # --------------------------------------------------
        # Technologies
        # --------------------------------------------------

        if intent == Intent.PROJECT_TECHNOLOGIES:

            return answer_project_technologies(
                project
            )

        # --------------------------------------------------
        # Model
        # --------------------------------------------------

        if intent == Intent.PROJECT_MODEL:

            return answer_project_model(
                project
            )

        # --------------------------------------------------
        # Accuracy
        # --------------------------------------------------

        if intent == Intent.PROJECT_ACCURACY:

            return answer_project_accuracy(
                project
            )

        # --------------------------------------------------
        # Features
        # --------------------------------------------------

        if intent == Intent.PROJECT_FEATURES:

            return answer_project_features(
                project
            )

        # --------------------------------------------------
        # Architecture
        # --------------------------------------------------

        if intent == Intent.PROJECT_ARCHITECTURE:

            return answer_project_architecture(
                project
            )

    # --------------------------------------------------
    # Unknown
    # --------------------------------------------------

    return UNKNOWN_TOPIC_RESPONSE


# ==================================================
# Chat Endpoint
# ==================================================

@app.post(
    "/api/chat",
    response_model=ChatResponse
)
def chat(
    request: ChatRequest
):

    message = request.message.strip()

    # --------------------------------------------------
    # Empty message
    # --------------------------------------------------

    if not message:

        return ChatResponse(
            session_id=request.session_id,
            intent=Intent.UNKNOWN.value,
            project=None,
            reply=(
                "Please ask me something about "
                "my professional background, "
                "projects, or skills."
            )
        )

    # --------------------------------------------------
    # Get conversation
    # --------------------------------------------------

    conversation = get_conversation(
        request.session_id
    )

    # --------------------------------------------------
    # Detect intent
    # --------------------------------------------------

    intent = detect_intent(
        message
    )

    conversation.set_intent(
        intent.value
    )

    # --------------------------------------------------
    # Detect project
    #
    # IMPORTANT:
    # Only project-related intents get a project.
    #
    # Therefore:
    #
    # "Tell me more about it"
    #      -> remembers IrisAPI
    #
    # "How many technologies do you know?"
    #      -> project = null
    #
    # "How many projects have you built?"
    #      -> project = null
    # --------------------------------------------------

    project = detect_project(
        message,
        conversation,
        intent
    )

    # --------------------------------------------------
    # Store user message
    # --------------------------------------------------

    conversation.add_message(
        "user",
        message
    )

    # --------------------------------------------------
    # Generate response
    # --------------------------------------------------

    reply = answer_question(
        message,
        intent,
        project,
        conversation
    )

    # --------------------------------------------------
    # Store assistant response
    # --------------------------------------------------

    conversation.add_message(
        "assistant",
        reply
    )

    # --------------------------------------------------
    # Return response
    # --------------------------------------------------

    return ChatResponse(
        session_id=request.session_id,
        intent=intent.value,
        project=(
            project["name"]
            if project
            else None
        ),
        reply=reply
    )