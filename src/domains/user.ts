export default interface IUser {
  name: string;
  email: string;
  nickname: string;
  picture: string;
  job_title: "user" | "manager";
}
