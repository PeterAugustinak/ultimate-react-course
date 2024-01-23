import { useState} from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// reusable components
function Button({children, onClick}) {
  return (
      <button className="button" onClick={onClick}>{children}</button>
  )
}


export default function App() {
  // list of friends for FriendsList component
  const [friends, setFriends] = useState(initialFriends);
  // showing of AddFriend component mechanism
  const [showAddFriend, setShowAddFriend] = useState(false);

  // handling showing of AddFriend component, always the opposite of current state
  function handleShowAddFriend() {
    setShowAddFriend(show => !showAddFriend);
  }

  // updates FriendsList after confirming of adding new friend + hide the
  // AddFriend component
  function handAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
    }

  return (
      <div className="app">
        <div className="sidebar">
          <FriendsList friends={friends}/>
          {showAddFriend && <FormAddFriend onAddFriend={handAddFriend}/>}
          <Button onClick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add friend"}
          </Button>
        </div>
        <FormSplitBill/>
      </div>
  );
}


function FriendsList({friends}) {
  return (
      <ul>
        {friends.map((friend) => (
            <Friend friend={friend} key={friend.id}/>
        ))}
      </ul>
  );
}


function Friend({friend}) {
  return (
      <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>

        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {Math.abs(friend.balance)}$
          </p>
        )}

        {friend.balance === 0 && (
          <p>You and {friend.name} are even</p>)}

        <Button>Select</Button>
      </li>
  );
}


function FormAddFriend({onAddFriend}) {
    const [name, setName] = useState("");

    const defaultUrl = "https://i.pravatar.cc/48"
    const [image, setImage] = useState(defaultUrl);

    // after "Add friend" is clicked
    function handleSubmit(e) {
        e.preventDefault();

        // prevent to safe new Friend if either of name or image is missing
        if (!name || !image) return;

        const id = crypto.randomUUID();
        const newFriend = {
            name,
            image: `${image}?=${id}`,
            balance: 0,
            id: id,
            };

        // here is the function in App called to re-render FriendsList with add newly
        // added friend
        onAddFriend(newFriend);

        // after confirming the form, fields are reset to default
        setName("");
        setImage(defaultUrl);
    }


  return (
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>😉 Friend name</label>
        <input
         type="text"
         value={name}
         onChange={(e) => setName(e.target.value)}
          />

        <label>😉 Image URL</label>
        <input
         type="text"
         value={image}
         onChange={(e) => setImage(e.target.value)}
          />

        <Button>Add</Button>
      </form>
  )
}

function FormSplitBill() {
  return (
      <form className="form-split-bill">
        <h2>Split a bill with XXX</h2>

        <label>X Bill value</label>
        <input type="text" />

        <label>X Your expenses</label>
        <input type="text" />

        <label>X Friend expenses</label>
        <input type="text" disabled/>

        <label>X Who is paying the bill?</label>
        <select>
          <option value="user">You</option>
          <option value="friend">XXX</option>
        </select>

        <Button>Split bill</Button>
      </form>
  )
}
