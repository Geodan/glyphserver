const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function ensureFontsSubmodule() {
  const fontsDir = path.join(__dirname, 'fonts');
  
  try {
      // Check if fonts directory exists and contains files (not empty)
      if (!fs.existsSync(fontsDir) || fs.readdirSync(fontsDir).length === 0) {
          console.log('Fonts submodule not found. Cloning...');
          
          // Initialize and update the submodule
          execSync('git submodule update --init --recursive', { 
              stdio: 'inherit',
              cwd: __dirname
          });
          
          console.log('Fonts submodule cloned successfully');
      }
  } catch (error) {
      console.error('Error cloning fonts submodule:', error);
      throw error;
  }
}

function ensureFontsGenerated(fontsDir) {

    ensureFontsSubmodule();
    // Check if the generated fonts directory exists and contains files
    
    try {
        // Check if directory exists and has files
        if (!fs.existsSync(fontsDir) || fs.readdirSync(fontsDir).length === 0) {
            console.log('Fonts not found. Generating fonts...');
            
            // Change to fonts directory
            process.chdir(path.join(__dirname, 'fonts'));
            
            // Install dependencies if needed
            if (!fs.existsSync(path.join(__dirname, 'fonts', 'node_modules'))) {
                console.log('Installing fonts dependencies...');
                execSync('npm install', { stdio: 'inherit' });
            }
            
            // Generate fonts
            execSync('node generate.js', { stdio: 'inherit' });
            
            // Change back to original directory
            process.chdir(__dirname);
            
            console.log('Fonts generated successfully');
        } else {
            console.log('Fonts already generated');
        }
    } catch (error) {
        console.error('Error generating fonts:', error);
        throw error;
    }
}

module.exports = ensureFontsGenerated;