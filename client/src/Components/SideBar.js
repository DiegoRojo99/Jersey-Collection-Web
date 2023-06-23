import { LeagueOptions, TeamOptions, BrandOptions } from "./Options";
import SearchBar from "./SearchBar";

function SideBar() {
  return (
    <div className="col-3 sidebar">
      <div className="row">
        <h6>SEARCH BAR</h6>
        <div className="bar-row">
          <SearchBar />
        </div>
      </div>
      <div className="row">
        <h6>LEAGUES</h6>
        <div className="bar-row">
          <LeagueOptions />
        </div>
      </div>
      <div className="row">
        <h6>BRANDS</h6>
        <div className="bar-row">
          <BrandOptions />
        </div>
      </div>
      <div className="row">
        <h6>TEAMS</h6>
        <div className="bar-row">
        <TeamOptions />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
