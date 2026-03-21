export type Badge = {
  name: string
  src: string
}

export type SkillGroup = {
  title: string
  badges: Badge[]
}

export type Project = {
  name: string
  summary: string
  details: string[]
  tech: string[]
}

export const completedProjects: Project[] = [
  {
    name: 'Dual Web',
    summary: 'Web application built for Dual company customers to consume core services.',
    details: [
      'Built for service operations and online service lookup.',
      'Frontend developed with Next.js and a CakePHP REST API backend.'
    ],
    tech: ['Next.js', 'CakePHP', 'API REST']
  },
  {
    name: 'Dual App',
    summary: 'Mobile application designed for fast access to Dual company services.',
    details: [
      'Developed with React Native + Expo.',
      'Includes push notification support and compatibility with iOS and Android.'
    ],
    tech: ['React Native', 'Expo', 'Push Notifications', 'iOS', 'Android']
  },
  {
    name: 'CRM',
    summary: 'Internal web application for customer relationship management at Dual.',
    details: [
      'Implemented in CakePHP with a Node.js socket layer for real-time events.',
      'Integrated with the WhatsApp Business API for customer support and follow-up.'
    ],
    tech: ['CakePHP', 'Node.js Socket', 'WhatsApp Business API']
  }
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    badges: [
      {
        name: 'Python',
        src: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white'
      },
      {
        name: 'Java',
        src: 'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white'
      },
      {
        name: 'C',
        src: 'https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black'
      },
      {
        name: 'C++',
        src: 'https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white'
      },
      {
        name: 'JavaScript',
        src: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'
      },
      {
        name: 'TypeScript',
        src: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white'
      },
      {
        name: 'PHP',
        src: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white'
      }
    ]
  },
  {
    title: 'Databases',
    badges: [
      {
        name: 'MongoDB',
        src: 'https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white'
      },
      {
        name: 'MySQL',
        src: 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white'
      },
      {
        name: 'MariaDB',
        src: 'https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white'
      },
      {
        name: 'Redis',
        src: 'https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white'
      },
      {
        name: 'Oracle',
        src: 'https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white'
      },
      {
        name: 'ArangoDB',
        src: 'https://img.shields.io/badge/ArangoDB-DDE072?style=for-the-badge&logo=arangodb&logoColor=black'
      }
    ]
  },
  {
    title: 'Front-End Tools',
    badges: [
      {
        name: 'CSS3',
        src: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white'
      },
      {
        name: 'Tailwind CSS',
        src: 'https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white'
      },
      {
        name: 'Bootstrap',
        src: 'https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white'
      },
      {
        name: 'Figma',
        src: 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white'
      }
    ]
  },
  {
    title: 'Back-End Tools',
    badges: [
      {
        name: 'Node.js',
        src: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'
      },
      {
        name: 'Express.js',
        src: 'https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'
      },
      {
        name: 'Supabase',
        src: 'https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white'
      },
      {
        name: 'npm',
        src: 'https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white'
      },
      {
        name: 'Postman',
        src: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white'
      },
      {
        name: 'JWT',
        src: 'https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white'
      }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    badges: [
      {
        name: 'React Native',
        src: 'https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black'
      },
      {
        name: 'Expo',
        src: 'https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white'
      },
      {
        name: 'React',
        src: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'
      },
      {
        name: 'Next.js',
        src: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white'
      },
      {
        name: 'Angular',
        src: 'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white'
      },
      {
        name: 'CakePHP',
        src: 'https://img.shields.io/badge/CakePHP-D33C43?style=for-the-badge&logo=cakephp&logoColor=white'
      }
    ]
  },
  {
    title: 'Other Tools',
    badges: [
      {
        name: 'Jira',
        src: 'https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white'
      },
      {
        name: 'Slack',
        src: 'https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white'
      },
      {
        name: 'DBeaver',
        src: 'https://img.shields.io/badge/DBeaver-372923?style=for-the-badge&logo=dbeaver&logoColor=white'
      },
      {
        name: 'Android Studio',
        src: 'https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white'
      },
      {
        name: 'Visual Studio Code',
        src: 'https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white'
      },
      {
        name: 'Visual Studio',
        src: 'https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visualstudio&logoColor=white'
      },
      {
        name: 'NetBeans',
        src: 'https://img.shields.io/badge/NetBeans-1B6AC6?style=for-the-badge&logo=apache-netbeans-ide&logoColor=white'
      },
      {
        name: 'Discord',
        src: 'https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white'
      },
      {
        name: 'phpMyAdmin',
        src: 'https://img.shields.io/badge/phpMyAdmin-6C78AF?style=for-the-badge&logo=phpmyadmin&logoColor=white'
      },
      {
        name: 'Notion',
        src: 'https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white'
      },
      {
        name: 'Trello',
        src: 'https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white'
      },
      {
        name: 'GitHub Desktop',
        src: 'https://img.shields.io/badge/GitHub_Desktop-30363D?style=for-the-badge&logo=github&logoColor=white'
      },
      {
        name: 'Git',
        src: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white'
      }
    ]
  }
]
