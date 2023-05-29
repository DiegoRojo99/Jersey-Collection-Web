import {LeagueOptions, TeamOptions} from "./Options";

function HomePage() {
  return (
    <div className="col-9">
      <div>
        <h3>INTRO SEARCH</h3>
      </div>
      <div>
        <h2>Leagues</h2>
        <LeagueOptions />
      </div>
      <div>
        <h3>Teams</h3>
        <TeamOptions />
      </div>
      <div>
        <h3>LAST</h3>
      </div>
    </div>
  );
}

export default HomePage;
