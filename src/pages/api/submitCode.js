import { spawn } from 'child_process';

export default function handler(req, res) {
  const { code, language } = req.body;

  // Determine the command to use based on the selected language
  let command, args;
  if (language === 'python') {
    command = 'python';
    args = ['-c', code];
  } else if (language === 'javascript') {
    command = 'node';
    args = ['-e', code];
  } else {
    res.status(400).json({ message: 'Invalid language selected' });
    return;
  }

  // Spawn a process and pass the code as an argument
  const process = spawn(command, args);

  let output = '';

  // Listen for stdout data from the process
  process.stdout.on('data', (data) => {
    output += data.toString();
  });

  // Listen for errors from the process
  process.on('error', (error) => {
    console.error(`An error occurred while running ${language}`, error);
    res.status(500).json({ message: `An error occurred while running ${language}` });
  });

  // Listen for the process to exit
  process.on('exit', (code) => {
    if (code === 0) {
      console.log(`${language} code executed successfully!`);
      console.log('Output:', output);
      res.status(200).json({ output });
    } else {
      console.error(`${language} code failed with exit code`, code);
      res.status(500).json({ message: `${language} code failed to execute` });
    }
  });
}
