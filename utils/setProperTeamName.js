const setProperTeamName = (team) => {
  if (team === "CS") team = "CSE";
  else if (
    team === "MM" ||
    team === "ECE-META" ||
    team === "ECE" ||
    team === "EC"
  )
    team = "ECEMETA";
  else if (team === "ME" || team === "MECH") team = "MECH";
  else if (team === "CE") team = "CIVIL";

  return team;
};

export default setProperTeamName;
