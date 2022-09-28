import Header from "../components/HeaderMenu";
import Footer from "../components/FooterMenu";
import axios from "axios";
import { useState } from "react";
import {
    Button,
    Box,
    Select,
    Heading,
    Text,
    IconButton,
    Icon,
} from "@chakra-ui/react";
import { TbBallTennis } from "react-icons/tb";
import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import NewGamesList from "../components/GamesList";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function OpenGamesPage({
    token,
    allGamesList,
    setAllGamesList,
    username,
    game,
    setGame,
    reload,
    setReload,
}) {
    const [displayDate, setDisplayDate] = useState("");
    const [filteredDate, setFilteredDate] = useState(null);
    const [searchDate, setSearchDate] = useState("");
    const [filteredLoc, setFilteredLoc] = useState(null);
    const [filteredSession, setFilteredSession] = useState(null);
    const [filteredMatch, setFilteredMatch] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchLoc, setSearchLoc] = useState("");
    const [searchSession, setSearchSession] = useState("");
    const [searchMatch, setSearchMatch] = useState("");
    const [filterStatus, setFilterStatus] = useState("no filter");
    const [locationList, setLocationList] = useState([]);

    console.log(allGamesList);
    console.log(filteredGames);
    console.log(filterStatus);

    const handleFilterDate = (date) => {
        console.log(date);
        console.log(DateTime.fromJSDate(date).toISODate(DateTime.DATE_MED));
        const formattedDate = DateTime.fromJSDate(date).toISODate(
            DateTime.DATE_MED
        );
        setSearchDate(`&date=${formattedDate}`);
    };

    const handleFilterGameLoc = (event) => {
        console.log(event.target.value);
        setFilteredLoc(event.target.value);
        setSearchLoc(`&location-id=${event.target.value}`);
    };

    const handleFilterSession = (event) => {
        console.log(event.target.value);
        setFilteredSession(event.target.value);
        setSearchSession(`&session-type=${event.target.value}`);
    };

    const handleFilterMatch = (event) => {
        console.log(event.target.value);
        setFilteredMatch(event.target.value);
        setSearchMatch(`&match-type=${event.target.value}`);
    };

    const handleSubmitFilter = () => {
        let searchURL = "https://teammate-app.herokuapp.com/session/?";
        console.log("submit filter clicked");
        searchURL += searchDate;
        searchURL += searchLoc;
        searchURL += searchSession;
        searchURL += searchMatch;
        console.log(searchURL);

        axios
            .get(`${searchURL}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                const responseOpen = res.data;
                const openExpandedGames = [];
                if (res.data.length > 0) {
                    for (let game of responseOpen) {
                        const confirmedPlayers = [];
                        for (let guest of game.guest_info) {
                            // console.log(guest);
                            if (
                                guest.status === "Host" ||
                                guest.status === "Accepted"
                            ) {
                                confirmedPlayers.push(guest);
                            }
                        }
                        const expandedGame = {
                            tennisBallColor:
                                game.host_info.profile.teammate_rank,
                            cardTitle: null,
                            displayStatus: "join",
                            bgColor: "#ffffff",
                            icon: null,
                            tennisBall: TbBallTennis,
                            displayUsers: confirmedPlayers,
                            displayUsersUsernames: null,
                            historyStatus: null,
                            buttonTitle: null,
                            buttons: [
                                { label: "Join", job: "send a join request" },
                            ],
                            ...game,
                        };
                        console.log(expandedGame);
                        openExpandedGames.push(expandedGame);
                        console.log(openExpandedGames);
                        setFilteredGames(openExpandedGames);
                        setFilterStatus("filtered");
                    }
                } else {
                    setFilterStatus("no results");
                }
            });
    };

    useEffect(() => {
        // get all locations and save them in state along with "Where" and "All"
        axios
            .get("https://teammate-app.herokuapp.com/court/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                const locations = [
                    { location_id: "", park_name: "Where" },
                    { location_id: "", park_name: "All" },
                ];
                locations.push(...res.data);
                setLocationList(locations);
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });
    }, []);

    return (
        <>
            <Header />

            <Box className="app-body">
                <Heading color="#234E52" textAlign="center" marginTop={2}>
                    Open Games
                </Heading>
                <Box
                    textAlign="center"
                    marginTop={5}
                    marginBottom={2}
                    maxW="350px"
                    marginRight="auto"
                    marginLeft="auto"
                >
                    <ReactDatePicker
                        onChange={(date) => {
                            console.log(date);
                            setDisplayDate(date);
                            setFilteredDate(date);
                            handleFilterDate(date);
                        }}
                        minDate={subDays(new Date(), 0)}
                        selected={displayDate}
                        placeholderText="When"
                    ></ReactDatePicker>
                    <Box className="filters" w="60%" m="auto">
                        <Select
                            textAlign="right"
                            w="100px"
                            size="s"
                            m={2}
                            variant="filled"
                            borderRadius={10}
                            display="inline-block"
                            onChange={handleFilterGameLoc}
                            value={filteredLoc}
                            id="filter-location"
                            name="filter-location"
                        >
                            {locationList.map((location) => (
                                <option value={location.location_id}>
                                    {location.park_name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            textAlign="right"
                            w="100px"
                            size="s"
                            m={2}
                            variant="filled"
                            borderRadius={10}
                            display="inline-block"
                            onChange={handleFilterSession}
                            value={filteredSession}
                            id="filter-type"
                            name="filter-type"
                        >
                            <option value="">Style</option>
                            <option value="">All</option>
                            <option value="Casual">Casual</option>
                            <option value="Competitive">Competitive</option>
                        </Select>
                        <Select
                            textAlign="right"
                            w="100px"
                            size="s"
                            m={2}
                            variant="filled"
                            borderRadius={10}
                            display="inline-block"
                            onChange={handleFilterMatch}
                            value={filteredMatch}
                            id="filter-type"
                            name="filter-type"
                        >
                            <option value="">Players</option>
                            <option value="">All</option>
                            <option value="Singles">Singles</option>
                            <option value="Doubles">Doubles</option>
                        </Select>
                        <Button
                            w="100px"
                            m={2}
                            p={0}
                            h="25px"
                            colorScheme="teal"
                            onClick={() => handleSubmitFilter()}
                        >
                            Filter
                        </Button>
                    </Box>
                </Box>

                {(() => {
                    switch (filterStatus) {
                        case "no filter":
                            return (
                                <NewGamesList
                                    token={token}
                                    gamesList={allGamesList}
                                    setGame={setGame}
                                    game={game}
                                    reload={reload}
                                    setReload={setReload}
                                />
                            );

                        case "filtered":
                            return (
                                <NewGamesList
                                    token={token}
                                    gamesList={filteredGames}
                                    setGame={setGame}
                                    game={game}
                                    reload={reload}
                                    setReload={setReload}
                                />
                            );
                        case "no results":
                            return (
                                <Box
                                    textAlign="center"
                                    className="game-card"
                                    bg="#ffffff"
                                    maxW="350px"
                                    justifyContent="center"
                                    m="auto"
                                >
                                    <Text color="#285E61" fontSize="18">
                                        No games were found matching your
                                        filters.
                                    </Text>
                                    <Text color="#285E61" fontSize="18" pt={6}>
                                        Do you wish a game like this existed? Go
                                        to{" "}
                                        <Link to="/new">
                                            <Box className="tooltip">
                                                <IconButton
                                                    aria-label="ProfileItem"
                                                    fontSize="1.4em"
                                                    size="sm"
                                                    colorScheme="teal"
                                                    color="teal"
                                                    variant="solid"
                                                    className="footer-button"
                                                    icon={
                                                        <Icon
                                                            as={FaPlus}
                                                            color="white"
                                                        />
                                                    }
                                                />
                                                <Text className="tooltiptext">
                                                    New Game
                                                </Text>
                                            </Box>
                                        </Link>{" "}
                                        to list a new game for others to join.
                                    </Text>
                                </Box>
                            );
                        default:
                            return null;
                    }
                })()}
            </Box>
            <Footer />
        </>
    );
}
