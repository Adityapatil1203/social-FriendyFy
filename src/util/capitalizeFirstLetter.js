export function capitalizeFirstLetter(string)
{
    if(string)
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// https://friendyfy.onrender.com
// `https://friendyfy.onrender.com/images/${profile?.profileImg}`