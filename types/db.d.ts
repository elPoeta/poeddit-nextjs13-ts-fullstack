export type ExtendedPost = Post & {
  subpoeddit: Subpoeddit;
  votes: Vote[];
  comments: Comment[];
  author: User;
};
