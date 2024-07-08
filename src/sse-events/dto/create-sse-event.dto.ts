export interface MessageParticipantsEvent {
  data: {
    message: {
      email: string;
      is_client: boolean;
      name: string;
      profile_logo: string;
    }[];
  };
}
