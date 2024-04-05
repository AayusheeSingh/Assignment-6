import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useAtom } from "jotai";
import { isAuthenticated } from "@/lib/authenticate";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData"; 

const RouteGuard = (props) => {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [authorized, setAuthorized] = useState(false);
  const PUBLIC_PATHS = ["/login", "/","/register", "/_error"];

  

  useEffect(() => {
    updateAtoms();
    authCheck(router.pathname);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

function authCheck(url) {
  const path = url.split("?")[0];
  if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
    setAuthorized(false);
    router.push("/login");
  } else {
    setAuthorized(true);
  }
}
  
async function updateAtoms(){
  setFavouritesList(await getFavourites());
  setSearchHistory(await getHistory());
}
  

  return <>{authorized && props.children}</>
};

export default RouteGuard;
