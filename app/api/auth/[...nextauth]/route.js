import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { getEmployeeData, validateCredentials } from "@/prisma/employee";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        let { success, message, data } = await validateCredentials(
          credentials.empno,
          credentials.password
        );
        if (success) {
          return {
            name: data.name,
            email: data.empno,
          };
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, user, token }) {
      if (!session) return;
      let { success, data } = await getEmployeeData(session.user.email);
      if (success) {
        return {
          ...session,
          user: {
            ...session.user,
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: data.role,
            empno: data.empno,
            orgno: data.orgno,
          },
        };
      } else {
        return null;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
