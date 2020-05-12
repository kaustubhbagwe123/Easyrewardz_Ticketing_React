import { Subject } from "rxjs";

const subject = new Subject();

export const transferData = {
  sendProfilePic: (pic) => subject.next({ profilePic: pic }),
  getProfilePic: () => subject.asObservable(),

  sendReport: (rep) => subject.next({ isReport: rep }),
  getReport: () => subject.asObservable(),
};
