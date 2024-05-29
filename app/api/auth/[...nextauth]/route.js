import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        // let { success, message, employee } = await ValidateCredentials(
        //   credentials.empno,
        //   credentials.password,
        //   true
        // );
        // if (success) {
        //   return {
        //     name: employee.name,
        //     email: employee.empno,
        //   };
        // } else {
        //   return null;
        // }

        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, user, token }) {
      if (!session) return;

      //   let { success, employee } = await GetEmployee(session.user.email);
      //   if (success) {
      //     return {
      //       ...session,
      //       user: {
      //         ...session.user,
      //         name: employee.name,
      //         email: employee.email,
      //         roles: employee.roles,
      //         image: employee.image,
      //         phone: employee.phone,
      //         designation: employee.designation,
      //         empno: employee.empno,
      //         organization: employee.organization,
      //       },
      //     };
      //   } else {
      //     // logout
      //     return null;
      //   }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
