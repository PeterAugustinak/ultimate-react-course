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
  // to communication between FriendsList and FormSplitTBill
  const [selectedFriend, setSelectedFriend] = useState(null);

  // handling showing of AddFriend component, always the opposite of current state
  function handleShowAddFriend() {
    setShowAddFriend(show => !showAddFriend);
  }

  // updates FriendsList after confirming of adding new friend + hide the
  // AddFriend component
  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
    }

  // handler for selected friend
  function handleSelection(friend) {
    // if friend is already selected, it will "deselect" that friend
    setSelectedFriend((cur) => cur?.id ===friend.id ? null : friend);
    // handles edge case when AddFriend form is open and we click on select
    // friend - it will close AddFriend so it is not opened at the same time
    // as FormSplitBill
    setShowAddFriend(false);
  }

  // after submitting the SplitBill, we need to update concerned Friend balance
  // in the FriendLists
  function handleSplitBill(value) {
    // updating Friends list
    setFriends(friends =>
      // iterating through friends in list
      friends.map(friend =>
       friend.id == selectedFriend.id
         // if the iterated friend is the selected one, we adjust balance based on the received value
         ? {...friend, balance: friend.balance + value}
         // if not, we just leave this friend as it is
         : friend
       )
    );
    // by this we will close SplitBill form and that means values in form are
    // reset to default (empty)
    setSelectedFriend(null);
  }

  return (
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            selectedFriend={selectedFriend}
            onSelection={handleSelection}
            />

          {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}
          <Button onClick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add friend"}
          </Button>
        </div>
        {selectedFriend &&
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        }
      </div>
  );
}


function FriendsList({friends, selectedFriend, onSelection}) {
  return (
      <ul>
        {friends.map((friend) => (
            <Friend
                friend={friend}
                key={friend.id}
                selectedFriend={selectedFriend}
                onSelection={onSelection}
                />
        ))}
      </ul>
  );
}


function Friend({friend, selectedFriend, onSelection}) {
  // we need to know if current friend is selected to properly set css
  // and button (if is selected, render "Close" button instead of "Select"
  const isSelected = selectedFriend?.id === friend.id;

  return (
      <li className={isSelected ? "selected" : ""}>
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
        <Button onClick={() => onSelection(friend)}>
            {isSelected ? "Close" : "Select"}
        </Button>
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

        // here is the function in App called to re-render FriendsList with newly
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

function FormSplitBill({selectedFriend, onSplitBill}) {
  // default must be string as it is for form text input
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  // this can be calculated, so it is not a state, if there is no bill value
  // we prevent the calculation
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    // we prevent to confirm form without required values filled
    if(!bill || !paidByUser) return;
    // calculates returned value based Who is paying the bill form selection
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  }

  return (
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {selectedFriend.name}</h2>

        <label>X Bill value</label>
        <input
            type="text"
             value={bill}
             onChange={(e) =>
               setBill(
                 Number(e.target.value) < paidByUser ? bill :
                 Number(e.target.value)
               )
             }
         />

        <label>X Your expenses</label>
        <input
            type="text"
             value={paidByUser}
             onChange={(e) =>
                 setPaidByUser(
                    Number(e.target.value) > bill ? paidByUser :
                    Number(e.target.value)
                )
             }
         />

        <label>X {selectedFriend.name}s expenses</label>
        <input type="text" disabled value={paidByFriend}/>

        <label>X Who is paying the bill?</label>
        <select
             value={whoIsPaying}
             onChange={(e) => setWhoIsPaying(e.target.value)}
         >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>

        <Button>Split bill</Button>
      </form>
  )
}
