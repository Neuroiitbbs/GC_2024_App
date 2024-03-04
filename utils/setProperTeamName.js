const setProperTeamName = (team) => {
  if (team === "CS") team = "CSE";
  if (team === "MM" || team === "ECE-META" || team === "ECE" || team === "EC")
    team = "ECEMETA";
  if (team === "ME" || team === "MECH") team = "MECH";

  return team;
};

export default setProperTeamName;
