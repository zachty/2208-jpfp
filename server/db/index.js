//require connection, and models, export it all at bottom after seed

const db = require('./database');
const Student = require('./student');
const Campus = require('./campus');

//perhaps move this to its own file
const syncAndSeed = async () => {
    await db.sync({ force: true });

    //seed students
    await Student.create({
        firstName: 'Arby',
        lastName: 'Halo',
        email: 'arby@arbyndachief.com',
        imageUrl:
            'https://static.wikia.nocookie.net/arbynthechiefbeta/images/0/00/The_Arbiter_%28Season_8%29.jpg',
        gpa: 1.3,
    });
    await Student.create({
        firstName: 'Master',
        lastName: 'Chief',
        email: 'ilovecortana56@gmail.com',
        imageUrl:
            'https://assets.reedpopcdn.com/digitalfoundry-2020-halo-3-master-chief-collection-tech-review-1594984762293.jpg/BROK/thumbnail/1600x900/format/jpg/quality/80/digitalfoundry-2020-halo-3-master-chief-collection-tech-review-1594984762293.jpg',
        gpa: 3.9,
    });
    await Student.create({
        firstName: 'Doom',
        lastName: 'Guy',
        email: 'whereami@aol.com',
        imageUrl:
            'https://cdn.mos.cms.futurecdn.net/tj9E8PGGnbuPwxVSjuHqQU.jpg',
        gpa: 2,
    });
    await Student.create({
        firstName: 'Joe',
        lastName: 'Smith',
        email: 'joeschmoe@email.org',
        gpa: 3.2,
    });
    await Student.create({
        firstName: 'Jon',
        lastName: 'Snow',
        email: 'khaleesi4eva@thewall.edu',
        imageUrl:
            'https://awoiaf.westeros.org/images/a/a0/Cristi_Balanescu_Jon_SnowGhost.png',
        gpa: 1.7,
    });
    //seed campuses
    await Campus.create({
        name: 'ONI',
        imageUrl:
            'https://static.wikia.nocookie.net/halo/images/6/67/Halo_Reach_-_Sword_Base_02.jpg/',
        address:
            '1 Secret Drive, New Alexandria, Eposz, Reach, Epsilon Erandi System',
        description: `The Office of Naval Intelligence is responsible for UNSC signals intelligence (SIGINT), human intelligence (HUMINT), counter-espionage, propaganda, and top-secret research and development programs. The agency mostly operates independently of other UNSC branches, and at times it contravenes the law and UNSC protocol to complete top-secret missions. ONI's Commander-in-Chief (CINCONI), is Admiral Serin Osman, successor and protegé to Margaret Parangosky.
        At this top tier research facility students can do anything from learning the basics of combat training to conducting cutting edge research with top minds like Dr. Catherine Halsey. Equipped with hundreds in smart AI, instant access to all of human knowledge is at your fingertips in this military academy`,
    });
    await Campus.create({
        name: 'The Wall',
        imageUrl:
            'https://metro.co.uk/wp-content/uploads/2019/04/SEI_62327730.jpg?quality=90&strip=all&w=1200&h=630&crop=1',
        address:
            'Way Up North, Middle of Nowhere, Kingdom of the Norht, Westeros',
        description:
            'Quaint university located in the northern part of Westeros. Offers wonderful education in swordfighting and archery. Accepts most people without background checks! You too could be a Waller! Warning: Here be dragons.',
    });
    await Campus.create({
        name: 'Hell',
        imageUrl:
            'https://static.wikia.nocookie.net/doom/images/8/89/Hell_intermission_map.png',
        address: 'Somewhere, Mars',
        description:
            'Not so much a university anymore, closed down in 2149 due to being overrun by an infestation of demons. Will be under new management soon',
    });
    await Campus.create({
        name: 'Test',
        address: 'Egypt',
        description: 'test test',
    });

    console.log(`
    Seeding successful!
  `);
};

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
    // Include your models in this exports object as well!
    db,
    syncAndSeed,
    Student,
    Campus,
};
