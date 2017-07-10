export const typeDefs = `
# projectId: cj2ryvxmbt4qw0160y6qhdgdl
# version: 203

type Comment implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  post: Post @relation(name: "PostOnComment")
  updatedAt: DateTime!
  usersWhoDownvoted: [User!]! @relation(name: "UsersDownvotedComment")
  usersWhoUpvoted: [User!]! @relation(name: "UsersUpvotedComment")
  text: String!
  user: User @relation(name: "CommentOnUser")
}

type File implements Node {
  contentType: String!
  createdAt: DateTime!
  id: ID! @isUnique
  name: String!
  post: Post @relation(name: "PostOnFile")
  secret: String! @isUnique
  size: Int!
  updatedAt: DateTime!
  url: String! @isUnique
  userProfilePic: User @relation(name: "UserOnFile")
  groupPic: Group @relation(name: "GroupOnFile")
  predefinedMeme: PredefinedMeme @relation(name: "PredefinedMemeOnFile")
}

type Group implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  name: String! @isUnique
  posts: [Post!]! @relation(name: "PostOnGroup")
  updatedAt: DateTime!
  users: [User!]! @relation(name: "UserOnGroup")
  admins: User @relation(name: "GroupOnUser")
  picFile: File @relation(name: "GroupOnFile")
}

type Post implements Node {
  category: Categories
  comments: [Comment!]! @relation(name: "PostOnComment")
  createdAt: DateTime!
  description: String!
  group: Group @relation(name: "PostOnGroup")
  id: ID! @isUnique
  imageUrl: String
  postedFile: File @relation(name: "PostOnFile")
  read: Boolean
  title: String
  updatedAt: DateTime!
  upvotes: Int
  user: User @relation(name: "UserOnPost")
  usersWhoDownvoted: [User!]! @relation(name: "UserDownvotedPost")
  usersWhoUpvoted: [User!]! @relation(name: "UserUpvotedPost")
  dummy: String
  karmaPoints: Int @defaultValue(value: 0)
  tags: [Tag!]! @relation(name: "PostOnTag")
  youtubeID: String
}

type User implements Node {
  createdAt: DateTime!
  downvotedComment: [Comment!]! @relation(name: "UsersDownvotedComment")
  downvotedPosts: [Post!]! @relation(name: "UserDownvotedPost")
  email: String @isUnique
  emailSubscription: Boolean
  groups: [Group!]! @relation(name: "UserOnGroup")
  id: ID! @isUnique
  name: String! @isUnique
  password: String
  posts: [Post!]! @relation(name: "UserOnPost")
  profilePic: File @relation(name: "UserOnFile")
  updatedAt: DateTime!
  upvotedComment: [Comment!]! @relation(name: "UsersUpvotedComment")
  upvotedPosts: [Post!]! @relation(name: "UserUpvotedPost")
  users1: [User!]! @relation(name: "UserOnUser")
  users2: [User!]! @relation(name: "UserOnUser")
  adminGroups: [Group!]! @relation(name: "GroupOnUser")
  comments: [Comment!]! @relation(name: "CommentOnUser")
  contributer: Contributor @relation(name: "ContributerOnUser")
  isAdmin: Boolean @defaultValue(value: false)
  karma: Int
}

type Contributor implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  text: String! @defaultValue(value: "Add Description...")
  updatedAt: DateTime!
  user: User @relation(name: "ContributerOnUser")
}

type PredefinedMeme implements Node {
  createdAt: DateTime!
  file: File @relation(name: "PredefinedMemeOnFile")
  id: ID! @isUnique
  name: String!
  updatedAt: DateTime!
}

type Tag implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  posts: [Post!]! @relation(name: "PostOnTag")
  text: String! @isUnique
  updatedAt: DateTime!
}
`;