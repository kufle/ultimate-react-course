
import { useState } from 'react';
import Button from './components/Button';
import FormAddFriend from './components/FormAddFriend';
import FormSplitBill from './components/FormSplitBill';
import Friend from './components/Friend';
import initialFriends from './data.json';

function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	function handleShowAddFriend() {
		setShowAddFriend(show => !show)
	}

	function handleAddNewFriend(payload: any) {
		setFriends((currentFriends) => [...currentFriends, payload]);
		setShowAddFriend(false);
	}
	
	function handleSelectedFriend(payload: any) {
		//jika sudah ter select dengan user yang sama , maka set null
		setSelectedFriend((currentSelected) => currentSelected?.id === payload.id ? null : payload );
		setShowAddFriend(false);
	}

	function handleSplitBill(value: any) {
		setFriends((currFriends) => {
			return currFriends.map((friend) => friend.id === selectedFriend?.id ? { ...friend, balance: friend.balance + value } : friend);
		});

		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				{friends.map(friend => (
					<Friend friend={friend} key={friend.id} selectedFriend={selectedFriend} onSelectedFriend={handleSelectedFriend}/>
				))}
				{ showAddFriend && <FormAddFriend onAddFriend={handleAddNewFriend} /> }
				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? 'Close' : 'Add Friend'}
				</Button>
			</div>
			{ selectedFriend && <FormSplitBill key={selectedFriend.id} selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
		</div>
	)
}

export default App
