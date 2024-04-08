import Button from "./Button"

function Friend({ friend, selectedFriend, onSelectedFriend }: any) {
    const isSelected = selectedFriend?.id === friend.id;
    
    function handleSelected(friend: any) {
        onSelectedFriend(friend);
    }

    return (
        <ul>
            <li className={isSelected ? "selected" : ""}>
                <img src={friend.image} alt={friend.name} />
                <h3>{friend.name}</h3>

                {friend.balance < 0 && (
                    <p className="red">
                        You owe {friend.name} {Math.abs(friend.balance)}&euro;
                    </p>
                )}

                {friend.balance > 0 && (
                    <p className="green">
                        You owe {friend.name} {Math.abs(friend.balance)}&euro;
                    </p>
                )}

                {friend.balance === 0 && (
                    <p>
                        You and {friend.name} are even
                    </p>
                )}
                <Button onClick={() => handleSelected(friend)}>
                    {isSelected ? 'Close' : 'Select'}
                </Button>
            </li>
        </ul>
    )
}

export default Friend
