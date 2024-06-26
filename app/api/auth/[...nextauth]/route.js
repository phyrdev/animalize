import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { getEmployeeData, validateCredentials } from "@/prisma/employee";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        let { success, data } = await validateCredentials(
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
    async session({ session }) {
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
            signature: data.signature,
            designation: data.designation,
            empno: data.empno,
            orgno: data.orgno,
            currency: data.organization.currency,
            orgname: data.organization.name,
            orgemail: data.organization.email,
            zipcode: data.organization.zipcode,
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
