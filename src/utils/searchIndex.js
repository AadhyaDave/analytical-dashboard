import {
  companyPerformanceTable,
  plantPerformanceTables,
  deptOEEComparison,
  sectionOEEComparison,
  machineStatusList
} from '../data/mockData';

let cachedIndex = null;

export const generateGlobalSearchIndex = () => {
  if (cachedIndex) return cachedIndex;

  const index = [];
  
  // 1. Companies
  companyPerformanceTable.forEach((comp, cIdx) => {
    const compName = comp.company;
    const compPathText = `Company`;
    const compPathArray = ['Global Group', compName];
    
    index.push({
      id: `c-${cIdx}`,
      type: 'Company',
      name: compName,
      pathText: compPathText,
      jumpData: {
        targetRole: 'MD',
        pathArray: compPathArray,
        contextData: { companyIdx: cIdx }
      }
    });

    // 2. Plants
    const plants = plantPerformanceTables[cIdx] || [];
    plants.forEach((plantData, pIdx) => {
      const plantName = plantData.plant.split(' — ')[0];
      const plantPathText = `Plant • ${compName}`;
      const plantPathArray = [...compPathArray, plantName];
      
      index.push({
        id: `p-${cIdx}-${pIdx}`,
        type: 'Plant',
        name: plantName,
        pathText: plantPathText,
        jumpData: {
          targetRole: 'PLANT_HEAD',
          pathArray: plantPathArray,
          contextData: { companyIdx: cIdx, plantIdx: pIdx }
        }
      });

      // 3. Departments
      deptOEEComparison.forEach((deptData, dIdx) => {
        const deptName = deptData.dept;
        const deptPathText = `Department • ${plantName} • ${compName}`;
        const deptPathArray = [...plantPathArray, deptName];

        index.push({
          id: `d-${cIdx}-${pIdx}-${dIdx}`,
          type: 'Department',
          name: deptName,
          pathText: deptPathText,
          jumpData: {
            targetRole: 'DEPT_HEAD',
            pathArray: deptPathArray,
            contextData: { companyIdx: cIdx, plantIdx: pIdx, deptIdx: dIdx }
          }
        });

        // 4. Sections
        sectionOEEComparison.forEach((secData, sIdx) => {
          const secName = secData.section;
          const secPathText = `Section • ${deptName} • ${plantName} • ${compName}`;
          const secPathArray = [...deptPathArray, secName];

          index.push({
            id: `s-${cIdx}-${pIdx}-${dIdx}-${sIdx}`,
            type: 'Section',
            name: secName,
            pathText: secPathText,
            jumpData: {
              targetRole: 'SECTION_HEAD',
              pathArray: secPathArray,
              contextData: { companyIdx: cIdx, plantIdx: pIdx, deptIdx: dIdx, sectionIdx: sIdx }
            }
          });

          // 5. Lines
          ['Line 1', 'Line 2'].forEach((lineName, lIdx) => {
            const linePathText = `Line • ${secName} • ${deptName} • ${plantName} • ${compName}`;
            const linePathArray = [...secPathArray, lineName];

            index.push({
              id: `l-${cIdx}-${pIdx}-${dIdx}-${sIdx}-${lIdx}`,
              type: 'Line',
              name: lineName,
              pathText: linePathText,
              jumpData: {
                targetRole: 'LINE_HEAD',
                pathArray: linePathArray,
                contextData: { companyIdx: cIdx, plantIdx: pIdx, deptIdx: dIdx, sectionIdx: sIdx, lineIdx: lIdx }
              }
            });

            // 6. Machines
            const machines = lIdx === 0 ? machineStatusList.slice(0, 4) : machineStatusList.slice(4, 8);
            machines.forEach((mach, mIdx) => {
              const machName = mach.id;
              const machPathText = `Machine • ${lineName} • ${secName} • ${plantName} • ${compName}`;
              const machPathArray = [...linePathArray, machName];

              index.push({
                id: `m-${cIdx}-${pIdx}-${dIdx}-${sIdx}-${lIdx}-${mIdx}`,
                type: 'Machine',
                name: machName,
                pathText: machPathText,
                jumpData: {
                  targetRole: 'MACHINE',
                  pathArray: machPathArray,
                  contextData: { companyIdx: cIdx, plantIdx: pIdx, deptIdx: dIdx, sectionIdx: sIdx, lineIdx: lIdx, machineId: mach.id }
                }
              });
            });
          });
        });
      });
    });
  });

  cachedIndex = index;
  return index;
};

// Permission Filter
export const filterIndexByPermissions = (index, currentPath) => {
  // If at root (Super Admin), can see everything
  if (currentPath.length <= 1) return index;

  return index.filter(item => {
    const itemPath = item.jumpData.pathArray;
    // Check if the item's path starts with the user's current restrictive path
    // For example, if currentPath is ['Global Group', 'Company B']
    // User can only see items where itemPath[0] === 'Global Group' and itemPath[1] === 'Company B'
    for (let i = 0; i < currentPath.length; i++) {
      if (itemPath[i] && itemPath[i] !== currentPath[i]) {
        return false;
      }
    }
    return true;
  });
};

// Ranking Algorithm
export const rankSearchResults = (results, query) => {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  // Priorities:
  // 1: Exact match
  // 2: Starts with
  // 3: Contains
  
  const exact = [];
  const startsWith = [];
  const contains = [];

  results.forEach(item => {
    const name = item.name.toLowerCase();
    if (name === q) {
      exact.push(item);
    } else if (name.startsWith(q)) {
      startsWith.push(item);
    } else if (name.includes(q)) {
      contains.push(item);
    }
  });

  return [...exact, ...startsWith, ...contains].slice(0, 50); // limit to top 50
};
