export type ExtendedPost = Post & {
  subpoeddtit: Subpoeddit;
  votes: Vote[];
  comments: Comment[];
  author: User;
};
