// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Console, Hook, Unhook } from "console-feed";
import { Card, AppBar, Toolbar, Typography } from "@material-ui/core";

const VisualConsole = () => {
  const [logs, setLogs] = useState([]);

  // run once!
  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(window.console);
  }, []);

  return (
    <Card className="card-box-hover-rise card-box-hover rounded-lg mb-4 d-block">
      <AppBar position="static" className="bg-red-lights mb-4">
        <Toolbar>
          <Typography className="text-white" color="textPrimary" variant="h6">
            [BETA] Error Log
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ backgroundColor: "#242424", marginBottom: "20px" }}>
        <Console logs={logs} filter={["error"]} variant="dark" />
      </div>
    </Card>
  );
};

export default VisualConsole;
