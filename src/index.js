const db = firebase.firestore();
window.location.hostname === "localhost" && db.useEmulator("localhost", 8080);

window.location.hostname !== "localhost" && firebase.analytics();

let roomId = undefined;

const roomsCollRef = db.collection("sps").doc("data").collection("rooms");
const roomDocRef = (roomId = "default") => roomsCollRef.doc(roomId);

const createNewRoom = () => {
  roomsCollRef
    .add(roomData)
    .then((docRef) => {
      roomId = docRef.id;
    })
    .catch((err) => console.error("error creating room", err));
};

const listenToRoom = () => {
  roomDocRef(roomId).onSnapshot((doc) => {
    console.log("updated");
    console.table(doc.data());
  });
};

const updateRoom = () => {
  roomDocRef(roomId).set(roomData, { merge: true });
};

const roomData = {
  host: {
    name: "hostname",
    play: "stone",
    played: false,
    score: 0,
  },
  guest: {
    name: "guestname",
    play: "paper",
    played: false,
    score: 0,
  },
  winner: "guest",
};
