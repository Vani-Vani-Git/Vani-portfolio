from dataclasses import dataclass, field


# ==================================================
# Conversation State
# ==================================================

@dataclass
class Conversation:

    session_id: str

    messages: list[dict] = field(
        default_factory=list
    )

    # --------------------------------------------------
    # Current project remembered from the conversation
    # --------------------------------------------------

    current_project: str | None = None

    # --------------------------------------------------
    # Most recently detected intent
    # --------------------------------------------------

    current_intent: str | None = None

    # --------------------------------------------------
    # Last user message
    # --------------------------------------------------

    previous_user_message: str | None = None

    # --------------------------------------------------
    # Last assistant response
    # --------------------------------------------------

    previous_assistant_message: str | None = None

    # ==================================================
    # Add Message
    # ==================================================

    def add_message(
        self,
        role: str,
        content: str
    ):

        self.messages.append({
            "role": role,
            "content": content
        })

        # --------------------------------------------------
        # Keep explicit references to the latest messages
        # --------------------------------------------------

        if role == "user":

            self.previous_user_message = content

        elif role == "assistant":

            self.previous_assistant_message = content

    # ==================================================
    # Set Project
    # ==================================================

    def set_project(
        self,
        project_id: str
    ):

        self.current_project = project_id

    # ==================================================
    # Set Intent
    # ==================================================

    def set_intent(
        self,
        intent: str
    ):

        self.current_intent = intent

    # ==================================================
    # Get Last User Message
    # ==================================================

    def last_user_message(
        self
    ) -> str | None:

        for message in reversed(
            self.messages
        ):

            if message["role"] == "user":

                return message["content"]

        return None

    # ==================================================
    # Get Last Assistant Message
    # ==================================================

    def last_assistant_message(
        self
    ) -> str | None:

        for message in reversed(
            self.messages
        ):

            if message["role"] == "assistant":

                return message["content"]

        return None

    # ==================================================
    # Clear Project Context
    # ==================================================

    def clear_project(
        self
    ):

        self.current_project = None


# ==================================================
# Conversation Storage
# ==================================================

conversations: dict[
    str,
    Conversation
] = {}


# ==================================================
# Get Conversation
# ==================================================

def get_conversation(
    session_id: str
) -> Conversation:

    if session_id not in conversations:

        conversations[
            session_id
        ] = Conversation(
            session_id=session_id
        )

    return conversations[
        session_id
    ]