from app.engine.intent import Intent
from app.engine.knowledge import (
    load_projects,
    load_profile
)


# ==================================================
# Standard Responses
# ==================================================

UNKNOWN_TOPIC_RESPONSE = (
    "I can't answer this. You can ask me any other "
    "professional-related or Vani knowledge-related questions."
)

UNKNOWN_PROFESSIONAL_RESPONSE = (
    "I don't currently have enough documented "
    "information to answer that accurately, "
    "and I don't want to guess."
)

UNKNOWN_TECHNOLOGY_RESPONSE = (
    "Not yet. But I'm a fast learner, and I'm "
    "always open to learning new things and "
    "expanding my knowledge."
)


# ==================================================
# Response Formatting Helpers
# ==================================================

def intro(message: str) -> str:
    return f"Sure! {message}"


def bullet_list(
    items: list[str]
) -> str:

    return "\n".join(
        f"• {item}"
        for item in items
    )


def join_sentence(
    items: list[str]
) -> str:

    if not items:
        return ""

    if len(items) == 1:
        return items[0]

    if len(items) == 2:
        return (
            f"{items[0]} and {items[1]}"
        )

    return (
        ", ".join(items[:-1])
        + f", and {items[-1]}"
    )


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
    message: str
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
# About Vanitha
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

    specialization = profile.get(
        "specialization",
        []
    )

    specialization_text = join_sentence(
        specialization
    )

    response = (
        f"Hi! I'm Vani, the AI version of "
        f"{name}.\n\n"
    )

    if title:

        response += (
            f"I'm an {title}"
        )

        if specialization_text:

            response += (
                f" specializing in "
                f"{specialization_text}"
            )

        response += ".\n\n"

    if summary:

        response += (
            f"{summary}\n\n"
        )

    response += (
        "You can ask me about my projects, "
        "skills, education, experience, "
        "certifications, or the technologies "
        "I work with."
    )

    return response


# ==================================================
# Project List / Count
# ==================================================

def answer_project_list(
    message: str = ""
) -> str:

    projects = load_projects()

    if not projects:

        return UNKNOWN_PROFESSIONAL_RESPONSE

    count = len(projects)

    text = message.lower()

    if (
        "how many" in text
        or "number of" in text
        or "count" in text
    ):

        return (
            f"I've worked on {count} documented "
            f"projects in my current portfolio."
        )

    names = [
        project.get(
            "name",
            "Unnamed project"
        )
        for project in projects
    ]

    return (
        "My documented projects include: "
        + join_sentence(names)
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

    if not detailed:

        if summary:

            return intro(
                f"{name} is {summary}"
            )

        return (
            f"I don't currently have enough "
            f"documented information about "
            f"{name} to explain it accurately."
        )

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

    if summary:

        response.append(
            intro(
                f"{name} is {summary}"
            )
        )

    if technologies:

        response.append(
            "I built it using "
            + join_sentence(technologies)
            + "."
        )

    if details:

        response.append(
            "Here are the main documented "
            "things it does:"
        )

        response.append(
            bullet_list(details)
        )

    if knowledge_limit:

        response.append(
            "I also want to be transparent: "
            + knowledge_limit
        )

    if not response:

        return (
            f"I don't currently have enough "
            f"documented information about "
            f"{name} to explain it accurately."
        )

    return "\n\n".join(
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

    name = project.get(
        "name",
        "this project"
    )

    if not technologies:

        return (
            f"I don't currently have the "
            f"documented technology details "
            f"for {name}."
        )

    return (
        f"For {name}, I used "
        + join_sentence(technologies)
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

    name = project.get(
        "name",
        "this project"
    )

    if not model:

        return (
            f"I don't currently have enough "
            f"documented information to give "
            f"you the exact model I used in "
            f"{name}. I don't want to guess."
        )

    model_name = model.get(
        "name"
    )

    description = model.get(
        "description"
    )

    sequence_length = model.get(
        "sequence_length"
    )

    response_parts = []

    if model_name:

        response_parts.append(
            f"I used {model_name} for {name}."
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
            f"the model used in {name}."
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

    name = project.get(
        "name",
        "this project"
    )

    if not evaluation:

        return (
            f"I don't currently have a "
            f"documented accuracy result for "
            f"{name}, so I don't want to guess."
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
            f"for {name} to answer that accurately."
        )

    response = (
        f"The current portfolio reports "
        f"{value} {metric} for {name}."
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

    name = project.get(
        "name",
        "this project"
    )

    if not details:

        return (
            f"I don't currently have enough "
            f"documented feature information "
            f"for {name}."
        )

    return (
        intro(
            f"{name} includes these "
            f"documented capabilities:"
        )
        + "\n\n"
        + bullet_list(details)
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

    name = project.get(
        "name",
        "this project"
    )

    if not details:

        return (
            f"I don't have enough documented "
            f"information to explain how "
            f"{name} works accurately."
        )

    # --------------------------------------------------
    # Look for details that directly describe
    # processing / workflow / implementation.
    # --------------------------------------------------

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
        "attendance",
        "sequence",
        "comparison",
        "authentication",
        "recognition",
        "algorithm",
        "visualization",
        "animation"
    ]

    relevant_details = [
        detail
        for detail in details
        if any(
            keyword in detail.lower()
            for keyword in architecture_keywords
        )
    ]

    # --------------------------------------------------
    # If architecture-specific information exists,
    # use it.
    # --------------------------------------------------

    if relevant_details:

        return (
            intro(
                f"Here's how {name} works "
                f"based on the documented "
                f"project information:"
            )
            + "\n\n"
            + bullet_list(relevant_details)
        )

    # --------------------------------------------------
    # If there isn't architecture-specific data,
    # don't invent architecture.
    #
    # Instead explain the documented workflow/
    # functionality at a high level.
    # --------------------------------------------------

    return (
        intro(
            f"Here's how {name} works based "
            f"on the documented project information:"
        )
        + "\n\n"
        + bullet_list(details)
        + "\n\n"
        + (
            "I don't have more detailed internal "
            "architecture information documented, "
            "so I don't want to invent implementation "
            "details."
        )
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

    sections = []

    for category, values in skills.items():

        if not values:
            continue

        formatted_category = (
            category
            .replace(
                "_",
                " "
            )
            .title()
        )

        sections.append(
            f"{formatted_category}: "
            + ", ".join(values)
        )

    return (
        "I work with a range of technologies across "
        "development, databases, cloud, testing, and tools. "
        "Here's a quick overview:\n\n"
        + "\n".join(sections)
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
        "My documented education includes:\n\n"
        + bullet_list(answers)
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
        "My documented experience includes:\n\n"
        + bullet_list(answers)
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
        "My documented certifications and "
        "programmes include:\n\n"
        + bullet_list(certifications)
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
        "Some of my documented achievements "
        "include:\n\n"
        + bullet_list(achievements)
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
        or "email address" in text
        or "mail" in text
        or "mail id" in text
        or "mail address" in text
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
    # Phone
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
# Main Responder
# ==================================================

def answer_question(
    message: str,
    intent: Intent,
    project: dict | None,
    conversation
) -> str:

    # ==================================================
    # Personal Questions
    # ==================================================

    if intent == Intent.PERSONAL_QUESTION:

        return UNKNOWN_TOPIC_RESPONSE


    # ==================================================
    # Knowledge Checks
    # ==================================================

    if intent == Intent.KNOWLEDGE_CHECK:

        return answer_knowledge_check(
            message
        )


    # ==================================================
    # Contact Information
    # ==================================================

    if intent == Intent.CONTACT_INFORMATION:

        return answer_contact_information(
            message
        )


    # ==================================================
    # About Vanitha
    # ==================================================

    if intent == Intent.ABOUT_VANITHA:

        return answer_about_vanitha()


    # ==================================================
    # Project List
    # ==================================================

    if intent == Intent.PROJECT_LIST:

        return answer_project_list(
            message
        )


    # ==================================================
    # Profile Information
    # ==================================================

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


    # ==================================================
    # Project Questions
    # ==================================================

    if is_project_intent(intent):

        if not project:

            return (
                "I couldn't identify which project "
                "you're asking about. Please mention "
                "the project name."
            )


        # --------------------------------------------------
        # Project Overview
        # --------------------------------------------------

        if intent == Intent.PROJECT_OVERVIEW:

            text = message.lower()

            detailed = any(
                phrase in text
                for phrase in [
                    "tell me more",
                    "tell me more about it",
                    "tell me more about this",
                    "tell me more about that",
                    "explain it more",
                    "explain this more",
                    "give me more details",
                    "give me more information",
                    "more about it",
                    "more about this",
                    "more about that",
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

        if intent == Intent.GREETING:
         return (
        "Hi! I'm Vani, Vanitha's personal AI assistant. "
        "You can ask me about her projects, skills, education, "
        "experience, or technical knowledge."
         )


        if intent == Intent.GOODBYE:
         return (
        "Goodbye! It was nice talking with you. "
        "Feel free to come back if you have any professional questions."
         )


        if intent == Intent.THANKS:
         return (
         "You're welcome! I'm happy to help."
         )


        if intent == Intent.HELP:
          return (
        "You can ask me about Vanitha's projects, technologies, "
        "skills, education, experience, certifications, achievements, "
        "or whether she has experience with a particular technology."
         )


        if intent == Intent.STRENGTHS:
          return (
        "Vanitha's strengths include problem solving, continuous learning, "
        "practical software development, and a willingness to learn new "
        "technologies. She enjoys turning ideas into working projects "
        "and improving her technical skills through hands-on experience."
           )


        if intent == Intent.HIRING:
         return (
        "Vanitha is an Associate Software Engineer with experience in "
        "Java, Python, Spring Boot, REST APIs and SQL, along with hands-on "
        "project and internship experience. She is a fast learner, "
        "open to new challenges, and interested in opportunities where "
        "she can contribute and continue growing as a developer."
         )


    # ==================================================
    # Unknown
    # ==================================================

    return UNKNOWN_TOPIC_RESPONSE