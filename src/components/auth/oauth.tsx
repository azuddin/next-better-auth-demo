import { useSearchParams } from "next/navigation";
import React from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

function Comp() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const signin = async (provider: "apple" | "google") => {
    await authClient.signIn.social({
      provider,
      callbackURL: redirectTo,
    });
  };

  return (
    <div className="inline-flex space-x-4">
      <Button className="w-full" onClick={() => signin("apple")}>
        <svg
          className="w-4 h-auto -mt-0.5"
          width="14"
          height="17"
          viewBox="0 0 14 17"
          fill="none"
        >
          <path
            d="M9.11035 2.96387C9.6167 2.34961 9.97363 1.51123 9.97363 0.664551C9.97363 0.54834 9.96533 0.432129 9.94873 0.34082C9.11865 0.374023 8.12256 0.888672 7.5332 1.58594C7.06006 2.11719 6.62842 2.96387 6.62842 3.81055C6.62842 3.94336 6.65332 4.06787 6.66162 4.10938C6.71143 4.11768 6.79443 4.13428 6.88574 4.13428C7.62451 4.13428 8.5542 3.63623 9.11035 2.96387ZM9.69141 4.30859C8.45459 4.30859 7.44189 5.06396 6.79443 5.06396C6.10547 5.06396 5.20898 4.3584 4.12988 4.3584C2.07959 4.3584 0.00439453 6.05176 0.00439453 9.23926C0.00439453 11.2314 0.768066 13.3315 1.72266 14.6846C2.53613 15.8301 3.25 16.7681 4.2793 16.7681C5.29199 16.7681 5.74023 16.0957 7.00195 16.0957C8.28027 16.0957 8.5708 16.7515 9.69141 16.7515C10.8037 16.7515 11.5425 15.7305 12.248 14.7261C13.0283 13.5723 13.3604 12.4517 13.3687 12.3936C13.3022 12.377 11.1772 11.5054 11.1772 9.07324C11.1772 6.96484 12.8457 6.01855 12.9453 5.94385C11.8413 4.3584 10.1562 4.30859 9.69141 4.30859Z"
            fill="white"
          />
        </svg>
      </Button>
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() => signin("google")}
      >
        <svg
          className="w-4 h-auto -mt-0.5"
          width="46"
          height="47"
          viewBox="0 0 46 47"
          fill="none"
        >
          <path
            d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
            fill="#4285F4"
          />
          <path
            d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
            fill="#34A853"
          />
          <path
            d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
            fill="#FBBC05"
          />
          <path
            d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
            fill="#EB4335"
          />
        </svg>
      </Button>
    </div>
  );
}

export default function OAuthButton() {
  return (
    <React.Suspense>
      <Comp />
    </React.Suspense>
  );
}
