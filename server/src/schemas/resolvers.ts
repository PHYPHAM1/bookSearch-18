// import Book from '../models/Book.js';
import User from '../models/Users.js';
import { signToken } from '../services/auth.js';

//todos: Important for input types: We need to update the resolver arguments to accept the input types we defined in the typeDefs.
interface addBookArgs{
        bookId: String
        title: String
        description: String
        image: String
        link: String
}

// interface UserArgs {
//     userId: string;
// }


const resolvers = {
    Query: { //reading data methods(get)
        //find 1 user  //todo:  do i need   context: IUser  for 3rd args??
        // user: async (_parent: any, { userId }: UserArgs) => {
        //     return await User.findOne({_id: userId});
        // },
        //TODOS: if user is authenticated, find and return user's info
        me: async (_parent: any, _args: any, context: any) => {
            if(context.user){
                // console.log("\n hello", context);
                return User.findOne({_id: context.user._id});
            }
            throw new Error
        }
    },
//  Important for input types: With the arguments updated to accept the input types, we can now destructure the profileInput object from the args object.
    Mutation: { //creating/updating/deleting methods (post/update/delete)
        savedBook: async (_parent: unknown, { bookData }: {bookData: addBookArgs}, context: any) => {
            console.log("bookInput", bookData);
            //We can now spread(spread operator) the profileInput object to the create method
            // console.log(context)
            return await User.findByIdAndUpdate({
                _id: context.user._id
            },{
                $push: {savedBooks: bookData}
            },{
                new: true
            });

        },
        removeBook: async (_parent: unknown, { bookId }: any, context: any) => {
            return await User.findOneAndUpdate({
                _id: context.user.userId},
            {
                $pull: {saveBook: {bookId}}
            },
            {
                new: true
            }
            );
        },
        addUser: async (_parents: unknown, args : any) => {
            console.log("args", args);
            const user = await User.create(args)
            const token = signToken(user.username, user.email, user._id)
            return { token, user}
        },
        
        login: async (_parents: unknown, args : any) => {
            console.log("args", args);
            const { email, password } = args
            const user = await User.findOne({email})
            const passwordmatch = await user?.isCorrectPassword(password)
            if(passwordmatch && user){
                const token = signToken(user?.username, user?.email, user?._id)
                // console.log("token", token);
                return { token, user}
            }
            throw new Error
        }
        
    }
};

export default resolvers;