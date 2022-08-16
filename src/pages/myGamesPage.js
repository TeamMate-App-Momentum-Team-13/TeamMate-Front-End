// make all the axios requests and pass all those as props - or make these in App.js?? 
// [] confirmed
// [] pendingPOVguest
// [] pendingPOVhost
// [] myOpen

// listType state is held in App.js

// header
// native menu (menu that's only on this page) to different types of lists
// GamesList component of a certain list type - pass in listType state and the list data as props
// GamesList: confirmed games
// GamesList: pending requests to join other games "pendingPOVGuest"
// GamesList: pending requests to join my games "pendingPOVHost"
// GamesList: my open games (no requests yet to join, so I could delete them without it impacting anyon)

// footer component

import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import { useState } from "react";
import axios from "axios";
import GamesList from "../components/gamesList";

export default function MyGames({
    token,
    listType,
    setListType,
    allGamesList,
}) {
    const [listTitle, setListTitle] = useState(null);

    const handleMenuConfirmed = () => {
        console.log("menu confirmed click");
        setListType("confirmed");
        setListTitle("My Confirmed Games");
    };

    const handleMenuPOVGuest = () => {
        console.log("menu POVGuest clicked");
        setListType("pendingPOVGuest");
        setListTitle("Games I Have Requested to Join");
    };

    const handleMenuPOVHost = () => {
        console.log("menu POVHost clicked");
        setListType("pendingPOVHost");
        setListTitle("Requests to Join my Games");
    };

    const handleMenuMyOpen = () => {
        console.log("menu myOpen clicked");
        setListType("myOpen");
        setListTitle("My Open Games");
    };

    return (
        <>
            <Header />
            <div>
                <button onClick={() => handleMenuConfirmed()}>
                    Confirmed Games
                </button>
                <button onClick={() => handleMenuPOVGuest()}>
                    Pending Requests I Have Made
                </button>
                <button onClick={() => handleMenuPOVHost()}>
                    Pending Requests to Join my Games
                </button>
                <button onClick={() => handleMenuMyOpen()}>
                    My Open Games
                </button>
            </div>
            <div>
                {(() => {
                    // Need to update which games array state is sent as games prop!!
                    switch (listType) {
                        case "confirmed":
                            return (
                                <GamesList
                                    token={token}
                                    games={allGamesList}
                                    listType={listType}
                                    listTitle={listTitle}
                                />
                            );
                        case "pendingPOVGuest":
                            return (
                                <GamesList
                                    token={token}
                                    games={allGamesList}
                                    listType={listType}
                                    listTitle={listTitle}
                                />
                            );
                        case "pendingPOVHost":
                            return (
                                <GamesList
                                    token={token}
                                    games={allGamesList}
                                    listType={listType}
                                    listTitle={listTitle}
                                />
                            );
                        case "myOpen":
                            return (
                                <GamesList
                                    token={token}
                                    games={allGamesList}
                                    listType={listType}
                                    listTitle={listTitle}
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
            <Footer />
        </>
    );
}