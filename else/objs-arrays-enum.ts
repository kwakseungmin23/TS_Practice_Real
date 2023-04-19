// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
// } = {
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
enum Role { ADMIN , READ_ONLY, AUTHOR };
const person = {
    name: "Minsu",
    age: 26,
    hobbies: ['Sports', 'Contemplation'],
    role: Role.ADMIN
};

let favoriteActivities: string[];
favoriteActivities = ['climing'];

console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}
if (person.role == Role.ADMIN) {
    console.log('is admin')
}