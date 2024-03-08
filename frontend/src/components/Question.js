import CurrentDate, { dayOnly, getCurrentDate } from './CurrentDate';
export default function Question(props){
    const questionMap = {
        "01": "CS35L is Easy.",
        "02": "Popcorn is disgusting!",
        "03": "Abortion is murder",
        "04": "The book is always better than the movie.",
        "05": "Cats are superior to dogs.",
        "06": "Social media is a waste of time.",
        "07": "Video games are a legitimate art form.",
        "08": "Pineapple belongs on pizza.",
        "09": "Gif is pronounced 'jif,' not 'gif.'",
        "10": "Cereal is better with water than milk.",
        "11": "The toilet paper should hang over, not under.",
        "12": "Socks with sandals is a fashionable look.",
        "13": "Reality TV is more educational than traditional documentaries.",
        "14": "All seasons of a TV show should be released at once.",
        "15": "Astrology is as valid as any science.",
        "16": "Eating dessert before dinner is practical.",
        "17": "Making the bed every morning is unnecessary.",
        "18": "The Oxford comma is essential for clear writing.",
        "19": "Ketchup is a perfectly acceptable pizza sauce.",
        "20": "Superheroes are more interesting than villains.",
        "21": "Tea is better than coffee.",
        "22": "Physical books are obsolete in the digital age.",
        "23": "A hot dog is a type of sandwich.",
        "24": "Batman could beat Superman in a fight.",
        "25": "Showering in the morning is better than showering at night.",
        "26": "Texting is better than calling.",
        "27": "Winter is the best season.",
        "28": "It's okay to wear white after Labor Day.",
        "29": "Comic books are for adults too.",
        "30": "Listening to music without headphones in public is acceptable.",
        "31": "Putting ice in wine doesn't ruin it."
      };
      
    const qotd = questionMap[dayOnly()]
    return (
        <div>
        <h3 class="daily-disrupt"> Daily !Disrupt! </h3>
        <CurrentDate />
            <p className="question">{qotd}</p>
            <div class="button-container">
            <button class="button-yes" onClick={props.toggleBoolYes}>Yes!</button>
            <button class="button-no" onClick={props.toggleBoolNo}>No!</button>
        </div>
        </div>
    )
}