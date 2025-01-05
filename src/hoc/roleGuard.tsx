
// import LoadingScreen from "@/components/LoadingScreen";
// import { useAppSelector } from "@/redux/hooks";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function RoleGuard(Component: any) {
//   return function IsAdmin(props: any) {
//     const { id, role } = useAppSelector((state) => state.user); 
//     const router = useRouter();

//     useEffect(() => {
//       if (!id) {
//         router.push("/login");
//       } else if (role !== "ADMIN") {
//         router.push("/not-authorized"); 
//       }
//     }, [id, role, router]);

//     if (!id || role !== "ADMIN") {
//       return <LoadingScreen />;
//     }

//     return <Component {...props} />;
//   };
// }



import LoadingScreen from "@/components/LoadingScreen";
import UnauthorizedPage from "@/components/unauthorized";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoleGuard(Component: any) {
  return function IsAdmin(props: any) {
    const { id, role } = useAppSelector((state) => state.user);
    const router = useRouter();
    const [showUnauthorized, setShowUnauthorized] = useState(false);

    useEffect(() => {
      if (!id) {
        router.push("/login");
      } else if (role !== "ADMIN") {
        setShowUnauthorized(true);
        // Redirect to home after 5 seconds
        const timer = setTimeout(() => {
          router.push("/"); // Redirect to home
        }, 5000);
        return () => clearTimeout(timer); // Cleanup timer on unmount
      }
    }, [id, role, router]);

    if (!id) {
      return <LoadingScreen />;
    }

    if (showUnauthorized) {
      return <UnauthorizedPage />;
    }

    return <Component {...props} />;
  };
}
