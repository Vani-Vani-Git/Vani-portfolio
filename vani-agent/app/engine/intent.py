from enum import Enum
import re


class Intent(str, Enum):
    PROJECT_OVERVIEW = "project_overview"
    PROJECT_TECHNOLOGIES = "project_technologies"
    PROJECT_MODEL = "project_model"
    PROJECT_FEATURES = "project_features"
    PROJECT_ACCURACY = "project_accuracy"
    PROJECT_ARCHITECTURE = "project_architecture"

    PROJECT_LIST = "project_list"

    GREETING = "greeting"
    GOODBYE = "goodbye"
    HELP = "help"
    HIRING = "hiring"
    THANKS = "thanks"
    STRENGTHS = "strengths"

    SKILLS = "skills"
    EDUCATION = "education"
    EXPERIENCE = "experience"
    CERTIFICATIONS = "certifications"
    ACHIEVEMENTS = "achievements"

    ABOUT_VANITHA = "about_vanitha"

    KNOWLEDGE_CHECK = "knowledge_check"
    CONTACT_INFORMATION = "contact_information"
    PERSONAL_QUESTION = "personal_question"

    UNKNOWN = "unknown"


def detect_intent(message: str) -> Intent:

    # --------------------------------------------------
    # Normalize text
    # --------------------------------------------------

    text = re.sub(
        r"[^\w\s-]",
        "",
        message.lower()
    ).strip()

    # --------------------------------------------------
    # Personal / private questions
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "how old is",
        "what is her age",
        "what is vanithas age",
        "date of birth",
        "date of birth of vanitha",
        "birthday",
        "when was vanitha born",
        "married",
        "marriage",
        "relationship",
        "boyfriend",
        "girlfriend",
        "husband",
        "wife",
        "family",
        "parents",
        "father",
        "mother",
        "siblings",
        "brother",
        "sister",
        "home address",
        "house address",
        "where does she live",
        "where does vanitha live",
        "personal life",
        "private life"
    ]):
        return Intent.PERSONAL_QUESTION

    # --------------------------------------------------
    # Greeting
    # --------------------------------------------------

    if any(phrase in text for phrase in [
    "hi",
    "hello",
    "hey",
    "hey vani",
    "hi vani",
    "hello vani",
    "good morning",
    "good afternoon",
    "good evening"
    ]):
      return Intent.GREETING


# --------------------------------------------------
# Goodbye
# --------------------------------------------------

    if any(phrase in text for phrase in [
    "bye",
    "goodbye",
    "good bye",
    "see you",
    "see you later",
    "talk to you later",
    "catch you later",
    "have a good day"
    ]):
      return Intent.GOODBYE


# --------------------------------------------------
# Thanks
# --------------------------------------------------

    if any(phrase in text for phrase in [
    "thanks",
    "thank you",
    "thankyou",
    "thanks vani",
    "thank you vani",
    "thanks a lot",
    "thank you so much"
    ]):
      return Intent.THANKS


# --------------------------------------------------
# Help
# --------------------------------------------------

    if any(phrase in text for phrase in [
    "help",
    "what can i ask",
    "what can i ask you",
    "what can i ask vani",
    "what can you do",
    "what can vani do",
    "how can you help",
    "what questions can i ask",
    "what kind of questions can i ask"
    ]):
       return Intent.HELP


# --------------------------------------------------
# Strengths
# --------------------------------------------------

    if any(phrase in text for phrase in [
    "what are your strengths",
    "what are vanitha strengths",
    "what are vanithas strengths",
    "what are her strengths",
    "what is your strength",
    "what is vanithas strength",
    "what is her strength",
    "tell me your strengths",
    "tell me vanithas strengths",
    "tell me her strengths",
    "what are you good at",
    "what is vanitha good at",
    "what is she good at",
    "what are your strong points",
    "what are vanithas strong points",
    "what are her strong points"
    ]):
       return Intent.STRENGTHS


# --------------------------------------------------
# Hiring
# --------------------------------------------------

    if any(phrase in text for phrase in [
    "why should i hire you",
    "why should we hire you",
    "why should i hire vanitha",
    "why should we hire vanitha",
    "why should i hire her",
    "why should we hire her",
    "why hire you",
    "why hire vanitha",
    "why hire her",
    "should i hire you",
    "should we hire you",
    "can i hire you",
    "can we hire you",
    "can i hire vanitha",
    "can we hire vanitha",
    "would you be a good fit",
    "would vanitha be a good fit",
    "would she be a good fit",
    "are you a good fit for this role",
    "is vanitha a good fit for this role",
    "is she a good fit for this role"
   ]):
      return Intent.HIRING

    # --------------------------------------------------
    # Contact information
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "phone number",
        "mobile number",
        "contact number",
        "email",
        "email address",
        "github",
        "github profile",
        "github id",
        "linkedin",
        "linkedin profile",
        "linkedin id",
        "where is vanitha based",
        "where is vanitha located",
        "vanitha location",
        "location",
        "where are you based",
        "where are you located"
    ]):
        return Intent.CONTACT_INFORMATION

    # --------------------------------------------------
    # Skills / "What do you know?"
    #
    # IMPORTANT:
    # These MUST appear before KNOWLEDGE_CHECK.
    #
    # "What technologies do you know?"
    # asks for a list.
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "what technologies do you know",
        "what technology do you know",
        "what are the technologies you know",
        "what are the technology you know",
        "what are the technologies you are familiar with",
        "what are the technologies you work with",
        "what technologies does vanitha know",
        "what technology does vanitha know",
        "what technologies does she know",
        "what technology does she know",

        "what technologies are you familiar with",
        "what technology are you familiar with",
        "which technologies are you familiar with",
        "which technology are you familiar with",

        "what technologies are you comfortable with",
        "which technologies are you comfortable with",

        "what tech stack do you know",
        "what tech stack does vanitha know",
        "what tech stack does she know",

        "what is your tech stack",
        "what is vanithas tech stack",
        "what is her tech stack",

        "what programming languages do you know",
        "which programming languages do you know",

        "what languages do you know",
        "which languages do you know",

        "what tools do you know",
        "which tools do you know",

        "what skills do you have",
        "what skills does vanitha have",
        "what skills does she have",

        "what technical skills do you have",
        "what technical skills does vanitha have",
        "what technical skills does she have",

        "what technologies do you have experience with",
        "what technologies does vanitha have experience with",
        "what technologies does she have experience with",

        "what technologies have you worked with",
        "what technologies has vanitha worked with",
        "what technologies has she worked with",

        "how many technologies do you know",
        "how many technologies does vanitha know",
        "how many technologies does she know",
        "how many technologies are you familiar with",
        "how many tech stacks do you know",
        "how many programming languages do you know",
        "how many skills do you have",
        "how many technical skills do you have",

        "skills",
        "technical skills",
        "technical skill",
        "programming languages",
        "programming language"
    ]):
        return Intent.SKILLS

        # --------------------------------------------------
    # Natural technology / skill count questions
    # --------------------------------------------------

    if re.search(
        r"\bhow\s+many\s+"
        r"(technologies|technology|tech\s+stacks?|"
        r"programming\s+languages|skills|"
        r"technical\s+skills|tools)"
        r"\s+"
        r"("
        r"do\s+you\s+know|"
        r"you\s+know|"
        r"did\s+you\s+know|"
        r"does\s+she\s+know|"
        r"did\s+she\s+know|"
        r"did\s+vanitha\s+know|"
        r"does\s+vanitha\s+know|"
        r"do\s+you\s+have|"
        r"does\s+she\s+have|"
        r"does\s+vanitha\s+have"
        r")\b",
        text
    ):
        return Intent.SKILLS

    # --------------------------------------------------
    # Project technology questions
    #
    # Examples:
    # "What technologies were used?"
    # "What technologies did she use?"
    # "What technologies did she use for ISL Connect?"
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "technologies used",
        "technology used",

        "technologies did vanitha use",
        "technology did vanitha use",

        "what technologies did vanitha use",
        "what technology did vanitha use",

        "what technologies does vanitha use",
        "what technology does vanitha use",

        "what technologies did she use",
        "what technology did she use",

        "what technologies does she use",
        "what technology does she use",

        "what technologies were used",
        "what technology was used",

        "which technologies were used",
        "which technology was used",

        "which technologies were used to build this",
        "which technology was used to build this",

        "which technologies did she use",
        "which technology did she use",

        "which technologies did vanitha use",
        "which technology did vanitha use",

        "what technologies were used to build",
        "what technology was used to build",

        "what technologies did she use for",
        "what technology did she use for",

        "what technologies did vanitha use for",
        "what technology did vanitha use for",

        # Natural project-technology wording
        "what are the technologies you used",
        "what are the technologies you use",
        "what are the technologies she used",
        "what are the technologies vanitha used",
        "what are the technologies used",
        "what technologies did you use",
        "what technology did you use",
        "what technologies have you used",
        "what technology have you used",
        "what technologies are used in this project",
        "what technology is used in this project",
        "what technologies were used in this project",
        "what technology was used in this project",
        "what technologies did you use in this project",
        "what technology did you use in this project",
        "what are the technologies you used in this project",
        "what are the technologies you use in this project",
        "what technology did you use for this project",
        "what technologies did you use for this project",

        "which technologies did she use for",
        "which technology did she use for",

        "which technologies did vanitha use for",
        "which technology did vanitha use for",

        "tech used",
        "tech stack used",
        "built using",
        "built with",
        "developed using",
        "developed with",

        "what tech stack did she use",
        "what tech stack did vanitha use",

        "what is the tech stack",

        "technologies used to build",
        "technology used to build"
    ]):
        return Intent.PROJECT_TECHNOLOGIES

    # --------------------------------------------------
    # Knowledge / technology check
    #
    # IMPORTANT:
    # This is for a specific technology.
    #
    # "Do you know Java?"
    # "Does Vanitha know Docker?"
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "does she know",
        "does vanitha know",
        "do you know",

        "does she have knowledge",
        "does vanitha have knowledge",
        "do you have knowledge",

        "is she familiar with",
        "is vanitha familiar with",
        "are you familiar with",

        "does she have experience with",
        "does vanitha have experience with",
        "do you have experience with",

        "can she work with",
        "can vanitha work with",
        "can you work with",

        "has she worked with",
        "has vanitha worked with",
        "have you worked with",

        "does she understand",
        "does vanitha understand",
        "do you understand",

        "did you know",
        "did vanitha know",
        "did she know",
        "have you knowledge of",
        "has she knowledge of",
        "has vanitha knowledge of",

        "is she knowledgeable about",
        "is vanitha knowledgeable about",
        "are you knowledgeable about"
    ]):
        return Intent.KNOWLEDGE_CHECK

    # --------------------------------------------------
    # Project list
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "what projects",
        "which projects",
        "projects has vanitha",
        "projects did vanitha",
        "her projects",
        "all projects",
        "list of projects",
        "show me her projects",
        "show me all projects",
        "what applications has she built",
        "what applications did she build",
        "how many projects",
        "how many projects have you done",
        "how many projects did you do",
        "how many projects did you build",
        "how many projects have you built",
        "how many projects does she have",
        "how many projects has she done",
        "how many projects has she built",
        "how many projects did vanitha do",
        "how many projects did vanitha build",
        "how many projects you done",
        "how many projects you have done",
    ]):
        return Intent.PROJECT_LIST

    # --------------------------------------------------
    # Education
    # --------------------------------------------------

    if any(word in text for word in [
        "education",
        "degree",
        "college",
        "university",
        "mca",
        "bca",
        "study",
        "studied",
        "academic",
        "academics",
        "qualification",
        "qualifications"
    ]):
        return Intent.EDUCATION

    # --------------------------------------------------
    # Experience
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "experience",
        "internship",
        "intern",
        "worked",
        "work experience",
        "professional experience",
        "company",
        "companies",
        "where has vanitha worked",
        "where did vanitha work",
        "where has she worked",
        "where did she work"
    ]):
        return Intent.EXPERIENCE

    # --------------------------------------------------
    # Certifications
    # --------------------------------------------------

    if any(word in text for word in [
        "certification",
        "certifications",
        "certificate",
        "certificates",
        "nptel",
        "course",
        "courses"
    ]):
        return Intent.CERTIFICATIONS

    # --------------------------------------------------
    # Achievements
    # --------------------------------------------------

    if any(word in text for word in [
        "achievement",
        "achievements",
        "award",
        "awards",
        "accomplishment",
        "accomplishments"
    ]):
        return Intent.ACHIEVEMENTS

    # --------------------------------------------------
    # Project accuracy
    # --------------------------------------------------

    if any(word in text for word in [
        "accuracy",
        "accurate",
        "validation accuracy",
        "performance",
        "accuracy rate",
        "how accurate"
    ]):
        return Intent.PROJECT_ACCURACY

    # --------------------------------------------------
    # Project model
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "model",
        "lstm",
        "algorithm used",
        "machine learning model",
        "ml model",
        "which model",
        "what model",
        "what machine learning model",
        "which machine learning model"
    ]):
        return Intent.PROJECT_MODEL

    # --------------------------------------------------
    # Project architecture
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "architecture",
        "workflow",
        "pipeline",
        "how does it work",
        "how does the project work",
        "how does the system work",
        "how does this work",
        "how was it built",
        "how did she build it",
        "how did vanitha build it",
        "how is it built",
        "how was the project built",
        "how was the system built",
        "how does the application work",
        "how does the app work"
    ]):
        return Intent.PROJECT_ARCHITECTURE

    # --------------------------------------------------
    # Natural architecture questions
    # --------------------------------------------------

    if (
        text.startswith("how does ")
        and text.endswith(" work")
    ):
        return Intent.PROJECT_ARCHITECTURE

    if (
        text.startswith("how is ")
        and text.endswith(" built")
    ):
        return Intent.PROJECT_ARCHITECTURE

    if (
        text.startswith("how was ")
        and text.endswith(" built")
    ):
        return Intent.PROJECT_ARCHITECTURE

    # --------------------------------------------------
    # Project features
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "features",
        "feature",
        "functionality",
        "functionalities",
        "capabilities",
        "what can it do",
        "what does it do",
        "what can this do",
        "what can the project do",
        "what can the system do",
        "what can the app do",
        "what can the application do",
        "what are its features",
        "what features does it have"
    ]):
        return Intent.PROJECT_FEATURES

    # --------------------------------------------------
    # Natural feature questions
    # --------------------------------------------------

    if re.search(
        r"\bwhat\s+can\s+(the\s+)?[\w\s-]+\s+(do|offer|provide)\b",
        text
    ):
        return Intent.PROJECT_FEATURES

    if re.search(
        r"\bwhat\s+does\s+(the\s+)?[\w\s-]+\s+(do|offer|provide)\b",
        text
    ):
        return Intent.PROJECT_FEATURES

    # --------------------------------------------------
    # About Vani / Vanitha
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "tell me about vanitha",
        "who is vanitha",
        "about vanitha",
        "introduce vanitha",
        "who is she",
        "tell me about her",
        "tell me about yourself",
        "who are you",
        "introduce yourself"
    ]):
        return Intent.ABOUT_VANITHA

    # --------------------------------------------------
    # General project question
    # --------------------------------------------------

    if any(phrase in text for phrase in [
        "tell me about",
        "about the project",
        "describe the project",
        "explain the project",
        "give me an overview",
        "what is the project",
        "what is visualdsa",
        "what is islconnect",
        "what is isl connect",
        "what is irisapi",
        "what is the totp project",
        "what is the library management system",
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
    ]):
        return Intent.PROJECT_OVERVIEW

    # --------------------------------------------------
    # Generic project words
    # --------------------------------------------------

    if any(word in text for word in [
        "project",
        "application",
        "app",
        "system"
    ]):
        return Intent.PROJECT_OVERVIEW

    # --------------------------------------------------
    # Unknown
    # --------------------------------------------------

    return Intent.UNKNOWN