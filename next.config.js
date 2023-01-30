/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  staticPageGenerationTimeout: 5000,
  compiler: {
    styledComponents: true,
    removeConsole: true,
  },
  experimental: {
    images: {
      optimized: true,
    },
    granularChunks: true,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
    ];
  },
  redirects: async () =>{
    return [
      {
        source: "/login",
        destination: "/",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/",
        permanent: true,
      },
      {
        source: "/merchant",
        destination: "/merchant-landing",
        permanent: true,
      },
      {
        source: "/search/top-locations/:toplocation*",
        destination: "/search/:toplocation*",
        permanent: true,
      },
      {
        source: "/search/Jungpura",
        destination: "/search/Jangpura",
        permanent: true,
      },
      {
        source: "/institute/friends-tuition-center",
        destination: "/institute/friends-tuition-centre",
        permanent: true,
      },
      {
        source: "/JEE-Main-Coaching-Institutes-in-Delhi",
        destination: "/IIT-JEE-MAIN-Coaching-Institutes-in-Delhi",
        permanent: true,
      },
      {
        source: "/institute/chemtime",
        destination: "/institute/asap-chemtime",
        permanent: true,
      },
      {
        source: "/search/Chattarpur",
        destination: "/search/Chhatarpur",
        permanent: true,
      },
      {
        source: "/cuet-coaching-classes-in-lajpat-nagar",
        destination: "/cuet-coaching-institutes-in-lajpat-nagar",
        permanent: true,
      },
      {
        source: "/cuet-coaching-institutes-in-south-extension",
        destination: "/cuet-coaching-institutes-in-south-ext-ii",
        permanent: true,
      },
      {
        source: "/institute/friends-tuition-centre",
        destination: "/institute/friends-tuition-centre-pvt-ltd",
        permanent: true,
      },
      // {
      //   source: '/IIT-JEE-Advance-Coaching-Institutes-in-Delhi',
      //   destination: '/IIT-JEE-ADVANCE-Coaching-Institutes-in-Delhi',
      //   permanent: true,
      // },
      ...oldPageRedirectRules(),
    ];
  },
};

module.exports = nextConfig;

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({});

function oldPageRedirectRules() {
  return inValidUrls.map((url) => {
    return {
      source: `${url}`,
      destination: `/search`,
      permanent: true,
    };
  });
}
const inValidUrls = [
  "/search/RecommendedCard",
  "/student-sign-in",
  "/institute/Bhavna_Gambhir_Commerce_Classes_/60d4a5c91aa2c37d2a257a14",
  "/institute/60366db64eaf3b077cb2efc5",
  "/ostello-blogs-single/60d1d20b1aa2c37d2a2579f4",
  "/course/carter,-farrell-and-connelly",
  "/institute/Neptune_Computer_Education_Institute_/60d9d9501aa2c37d2a257a3d",
  "/www.ostello.co.in",
  "/institute/roshan-jose-institute/course/history-&-geography",
  "/institute/60f955257da10e17e03369c9",
  "/institute/BrainCentre/60f575877da10e17e0336973",
  "/institute/60d34bc31aa2c37d2a257a08",
  "/institute/BRAINY_AND_BRIGHT/60b9dfa77ddee90b1a292224",
  "/institute/5f926bdd8a6bd31f634942dc",
  "/institute/5f944a288a6bd31f634942eb",
  "/institute/Essence_Point/60dad7bf1aa2c37d2a257a47",
  "/institute/5f69dc89ffb0e467494bed5e",
  "/ostello-blogs-single/60d1d20c1aa2c37d2a2579f6",
  "/institute/The_legal_ocean_/6103f7767da10e17e0336a11",
  "/ostello-blogs-single/Top_5_Bsc_colleges_in_Delhi/610a086b7da10e17e0336a24",
  "/institute/60e07dc81aa2c37d2a257a91",
  "/ostello-blogs-single/BCA_Colleges_in_Delhi/6103b25d7da10e17e0336a0e",
  "/institute/Neptune_Computer_Education_Institute_/60ceb6971aa2c37d2a2579dc",
  "/institute/Edubase_Coaching_Centre_/616064da8e3c8c4ab05add82",
  "/institute/Mahendra/60dd79871aa2c37d2a257a64",
  "/institute/Aurum_smart_classes/60ae1cd37ddee90b1a2921ee",
  "/institute/Fluent_India_English_Classes/6065dba9bba8c50aac081d5e",
  "/course/political-science",
  "/institute/react-institute",
  "/institute/60d1acf31aa2c37d2a2579ec",
  "/ostello-blogs-single/60daf4541aa2c37d2a257a4d",
  "/institute/60967eba8c75c308fb5dd701",
  "/institute/STARMINDS_EDUCATIONS/60f68af97da10e17e0336989",
  "/institute/roshan-jose-institute/course/political-science",
  "/ostello-blogs-single/Education's_Importance_in_Life/60e7b0111aa2c37d2a257ae7",
  "/institute/60e55db91aa2c37d2a257acc",
  "/ostello-blogs-single/60e7f6db1aa2c37d2a257aed",
  "/institute/60e312351aa2c37d2a257aad",
  "/institute/60d1d1931aa2c37d2a2579f3",
  "/ostello-blog",
  "/institute/60e053791aa2c37d2a257a8d",
  "/institute/60bf36867065c579cac6630b",
  "/institute/60d2e6ca1aa2c37d2a257a04",
  "/institute/Mahadeva_classes/60bb59107ddee90b1a292232",
  "/test/care@ostello.co.in",
  "/institute/Sri_CHAKRAS_academy/60e07dc81aa2c37d2a257a91",
  "/institute/AoA/60f53dfa7da10e17e033696c",
  "/institute/60eed54628bbae629fa8a0f8",
  "/student-sign-up",
  "/institute/RAY COACHING/603890454eaf3b077cb2efcc",
  "/institute/tradingstation.in/60e7f9c41aa2c37d2a257aef",
  "/institute/LEARNING_POINT_THE_EDUCATIONAL_ACADEMY/608fd3b7bba8c50aac081d7e",
  "/institute/Confidant_Classes/60fa7e687da10e17e03369da",
  "/institute/60d0898f1aa2c37d2a2579e4",
  "/institute/R_J_classes/60f955257da10e17e03369c9",
  "/institute/608fd3b7bba8c50aac081d7e",
  "/institute/60f2ff567da10e17e0336959",
  "/institute/a2ls32ls",
  "/ostello-blogs-single/Government_Colleges_in_Delhi/6102c76c7da10e17e0336a08",
  "/institute/6093c5248c75c308fb5dd6f9",
  "/institute/5f53734af887f65cca24d02b",
  "/institute/Kaur_Institute_of_Social_Science/5f944a288a6bd31f634942eb",
  "/course/baumbach,-wisoky-and-kessler",
  "/institute/603890454eaf3b077cb2efcc",
  "/institute/Aditi_Classes/60be2ac77065c579cac66304",
  "/institute/Vedashree_Academy/60e5172a1aa2c37d2a257ac6",
  "/institute/60d188761aa2c37d2a2579e6",
  "/ostello-blogs-single/60e28f4c1aa2c37d2a257aa7",
  "/institute/60e1ca4c1aa2c37d2a257a98",
  "/institute/60be2ac77065c579cac66304",
  "/institute/60e5172a1aa2c37d2a257ac6",
  "/contact",
  "/tnc",
  "/institute/60f2ba657da10e17e033694a",
  "/ostello-care",
  "/institute/618bf22d2c5ef01dcd348595",
  "/institute/Complete_Solution_Academy/60e408e41aa2c37d2a257ab9",
  "/institute/60cc70413ca59f17457856bd",
  "/institute/Unique_Academy/60e4620b1aa2c37d2a257ac1",
  "/institute/608f7f70bba8c50aac081d7c",
  "/institute/60e408e41aa2c37d2a257ab9",
  "/institute/ASPIRE_STUDY/60e56a0a1aa2c37d2a257ace",
  "/institute/3_D_COMPETITIVE_CLASSES/60d299851aa2c37d2a2579fc",
  "/hbptizmosawvlcta.html",
  "/institute/THE_IMPACT_IAS_ACADEMY/60f6643f7da10e17e0336977",
  "/institute/ARIZE_EDUCATION_/60e5804e1aa2c37d2a257ad0",
  "/institute/60dc70991aa2c37d2a257a5f",
  "/institute/sciencestoppers/603a589e4eaf3b077cb2efd0",
  "/institute/60e69be61aa2c37d2a257ad6",
  "/institute/Bhakti_Ramnathkar/60686c9bbba8c50aac081d64",
  "/institute/60ed2badf846645950a3a506",
  "/ostello-blogs-single/60c9e7713ca59f17457856b5",
  "/ostello-blogs-single/Websites_that_will_help__in_their_education./60e7f0841aa2c37d2a257aec",
  "/institute/60f6643f7da10e17e0336977",
  "/institute/616064da8e3c8c4ab05add82",
  "/institute/60ffcca77da10e17e03369f0",
  "/ostello-blogs-single/60e7e8731aa2c37d2a257aea",
  "/privacy-policy.html",
  "/institute/6103f7767da10e17e0336a11",
  "/ostello-blogs-single/Life_is_not_as_it_appears,_but_as_we_perceive_it./60e7b07b1aa2c37d2a257ae8",
  "/institute/60d2d65d1aa2c37d2a257a02",
  "/institute/602a77ec67078b0812d1f764",
  "/institute/Edudigm/61569c9998b01258f9545b84",
  "/institute/60ae205c7ddee90b1a2921f3",
  "/institute/60e5804e1aa2c37d2a257ad0",
  "/ostello-blogs-single/60d374e11aa2c37d2a257a09",
  "/institute/60bb59107ddee90b1a292232",
  "/institute/Kitabee_Education_Services/601a63e6853aa007b861edb9",
  "/institute/604b918f4eaf3b077cb2efd9",
  "/institute/60d722971aa2c37d2a257a29",
  "/institute/6026191067078b0812d1f759",
  "/institute/60ed2a9ff846645950a3a505",
  "/institute/60f53a4b7da10e17e033696a",
  "/institute/60c0687c7065c579cac6630f",
  "/institute/SWASTIK_CLASSES/60eed54628bbae629fa8a0f8",
  "/institute/60bf2a547065c579cac66309",
  "/institute/60f6c7b47da10e17e033698d",
  "/ostello-blogs-single/60d1b0471aa2c37d2a2579ed",
  "/institute/60d44f7b1aa2c37d2a257a0f",
  "/ostello-blogs-single/60e85b131aa2c37d2a257afa",
  "/institute/60f3aa3f7da10e17e033695d",
  "/institute/60e087051aa2c37d2a257a93",
  "/institute/60e134c61aa2c37d2a257a96",
  "/ostello-blogs-single/Top_Government_Colleges_in_Delhi/6110e4007da10e17e0336a34",
  "/institute/60daf4221aa2c37d2a257a4c",
  "/ostello-blogs-single/60e6ae5e1aa2c37d2a257adb",
  "/institute/Aksha_Educational_Institute/60bf36867065c579cac6630b",
  "/institute/Ignite_classes/602a77ec67078b0812d1f764",
  "/institute/Oasis_Institute_/60d1b54e1aa2c37d2a2579ef",
  "/institute/ROY_COACHING_/60d1d1931aa2c37d2a2579f3",
  "/institute/6039e70c4eaf3b077cb2efce",
  "/institute/avinash_institute/60effb767da10e17e0336925",
  "/institute/IT_FOUNDATION_/60e2f79f1aa2c37d2a257aab",
  "/ostello-blogs-single/60e842831aa2c37d2a257af6",
  "/institute/60effb767da10e17e0336925",
  "/institute/Atharava_Academy/60ffcca77da10e17e03369f0",
  "/institute/60dd79871aa2c37d2a257a64",
  "/institute/60d299851aa2c37d2a2579fc",
  "/institute/Divya academy /60f520547da10e17e0336967",
  "/institute/60f664997da10e17e0336978",
  "/ostello-blogs-single/60cf68f01aa2c37d2a2579df",
  "/institute/60db0f471aa2c37d2a257a54",
  "/institute/60daf4fd1aa2c37d2a257a50",
  "/institute/6088eb4ebba8c50aac081d74",
  "/institute/Divya_academy/60ed2badf846645950a3a506",
  "/institute/STUDY ZONE/60e5d0861aa2c37d2a257ad2",
  "/institute/60e6a47f1aa2c37d2a257ad8",
  "/institute/Srishti_I_A_S/60dae0e11aa2c37d2a257a49",
  "/institute/Foundation_Point/60eaa3075e815a25a97e5be1",
  "/institute/60bb5fee7ddee90b1a292236",
  "/institute/STUDY_ZONE/60e5d0861aa2c37d2a257ad2",
  "/ostello-blogs-single/60d1cf901aa2c37d2a2579f1",
  "/institute/60dea1881aa2c37d2a257a74",
  "/institute/6013d8a7853aa007b861edb0",
  "/institute/60e5d0861aa2c37d2a257ad2",
  "/institute/60e56a0a1aa2c37d2a257ace",
  "/institute/Neetu_coaching_center_/60e075981aa2c37d2a257a8f",
  "/ostello-blogs-single/60e6ab1b1aa2c37d2a257ad9",
  "/ostello-blogs-single/60e70ada1aa2c37d2a257ae1",
  "/care@ostello.co.in",
  "/institute/60d9d9501aa2c37d2a257a3d",
  "/institute/60e075981aa2c37d2a257a8f",
  "/ostello-blogs-single/60d3d3701aa2c37d2a257a0b",
  "/institute/HI-NESS_ENGLISH_SPEAKING_&_COMPUTER_INSTITUTE./60e087051aa2c37d2a257a93",
  "/auth",
  "/institute/60dae0e11aa2c37d2a257a49",
  "/institute/60c20e747065c579cac66317",
  "/ostello-blogs-single/NEET_COACHING_IN_DELHI/61112c7e7da10e17e0336a36",
  "/ostello-blogs-single/60e7f0841aa2c37d2a257aec",
  "/institute/60d1b54e1aa2c37d2a2579ef",
  "/institute/5f9a5b5f55512a047b48bc88",
  "/institute/60c650e4b0128575ca2921ea",
  "/institute/Tyron Classes/60d0377e1aa2c37d2a2579e2",
  "/institute/SWASTIK CLASSES/60eed54628bbae629fa8a0f8",
  "/institute/PATHAK_ACADEMY/60b0c8ab7ddee90b1a2921ff",
  "/institute/60cb158c3ca59f17457856b9",
  "/institute/Study Planet/60f6c7b47da10e17e033698d",
  "/institute/Yogyapeeth /60d190951aa2c37d2a2579e8",
  "/ostello-blogs-single/60e7b0111aa2c37d2a257ae7",
  "/institute/60d0377e1aa2c37d2a2579e2",
  "/institute/GALAXY_CLASSES/6093c5248c75c308fb5dd6f9",
  "/institute/Study_Planet/60f6c7b47da10e17e033698d",
  "/institute/MY_CAREER_INSTITUTE/60f3aa3f7da10e17e033695d",
  "/institute/Top classes/60f2ba657da10e17e033694a",
  "/institute/TACOCA_CLASSES_/60daf4221aa2c37d2a257a4c",
  "/institute/Batch-99_Coaching_Center/60ae205c7ddee90b1a2921f3",
  "/institute/Kanojia_Computer_Classes/60d1a00f1aa2c37d2a2579ea",
  "/institute/60d9b4811aa2c37d2a257a37",
  "/institute/Micro_Computer_Training_Center_/60e1ca4c1aa2c37d2a257a98",
  "/institute/BANSAL ACADEMY /5ff356498a551373d8c151f1",
  "/institute/GALAXY CLASSES/6093c5248c75c308fb5dd6f9",
  "/institute/60b9e47b7ddee90b1a292229",
  "/institute/Brainspark_Academy/60e6a47f1aa2c37d2a257ad8",
  "/institute/OMG_Educational_Services_Pvt_Ltd/601d5126853aa007b861edc7",
  "/institute/Yogyapeeth_/60d190951aa2c37d2a2579e8",
  "/institute/Top_classes/60f2ba657da10e17e033694a",
  "/institute/Sethi_Classes/606b1f9dbba8c50aac081d68",
  "/institute/60f128af7da10e17e0336933",
  "/institute/60228bce67078b0812d1f74e",
  "/institute/60d1f7bf1aa2c37d2a2579f9",
  "/institute/60d4311b1aa2c37d2a257a0d",
  "/institute/601d5126853aa007b861edc7",
  "/institute/60d955f71aa2c37d2a257a31",
  "/institute/60e7fdb21aa2c37d2a257af1",
  "/institute/PATHAK ACADEMY/60b0c8ab7ddee90b1a2921ff",
  "/institute/SBS Impex/60f2e1897da10e17e0336953",
  "/institute/VELICHAM_ACADEMY/60d44f7b1aa2c37d2a257a0f",
  "/institute/Anju_classes_/60f00c917da10e17e0336927",
  "/institute/606b1f9dbba8c50aac081d68",
  "/institute/shiv_tutorial/604b918f4eaf3b077cb2efd9",
  "/ostello-blogs-single/Top_4_State_University_in_Delhi/60f02bc77da10e17e0336928",
  "/institute/60b0c8ab7ddee90b1a2921ff",
  "/ostello-blogs-single/Top_5_Books_Every_Student_Should_Read/60e6ae5e1aa2c37d2a257adb",
  "/institute/60928c608c75c308fb5dd6ed",
  "/institute/Momentum_Career_Classes/60c0687c7065c579cac6630f",
  "/institute",
  "/institute/Gyansthali_Institute/6039e70c4eaf3b077cb2efce",
  "/institute/60f3e1617da10e17e0336961",
  "/institute/603a589e4eaf3b077cb2efd0",
  "/institute/Tyron_Classes/60d0377e1aa2c37d2a2579e2",
  "/institute/6065d785bba8c50aac081d5b",
  "/institute/61569c9998b01258f9545b84",
  "/ostello-blogs-single/Top_Psychology_Colleges_in_Delhi/6110c7767da10e17e0336a2f",
  "/institute/Ashoka_IAS_Academy/60ed2a9ff846645950a3a505",
  "/institute/SBS_Impex/60f2e1897da10e17e0336953",
  "/institute/60ec75d5d25af3447b990190",
  "/institute/Sailesh_Goenka_Classes/60281c7a67078b0812d1f75e",
  "/institute/The_GURUKULAM_FOUNDATION_/60e547831aa2c37d2a257ac8",
  "/institute/601a63e6853aa007b861edb9",
  "/institute/60f115067da10e17e0336931",
  "/institute/5feaa62b05683e1b44ed54c1",
  "/institute/60d4a5c91aa2c37d2a257a14",
  "/institute/60f2e1897da10e17e0336953",
  "/institute/Study_Smart_Overseas_&_IELTS_Training/60dd9ce01aa2c37d2a257a66",
  "/test/resource",
  "/ostello-blogs-single/Top_Nursing_Colleges_in_Delhi/610a01da7da10e17e0336a23",
  "/institute/60281c7a67078b0812d1f75e",
  "/ostello-blogs-single/Top_Private_Medical_colleges_in_Delhi/610ca9237da10e17e0336a2a",
  "/institute/5ff356498a551373d8c151f1",
  "/institute/Smartedge/6026191067078b0812d1f759",
  "/institute/theEXPLORER/5f926bdd8a6bd31f634942dc",
  "/institute/THE_RAYS_INSTITUTE/60cb158c3ca59f17457856b9",
  "/institute/ASPIRE_EDUCATION_CLASSES/60d1acf31aa2c37d2a2579ec",
  "/institute/Nest_India/60bf2a547065c579cac66309",
  "/institute/Aptech_Kidwai_Nagar/60ed94f8f846645950a3a513",
  "/institute/Aman's_Academy_of_English/5f9a42e155512a047b48bc80",
  "/institute/Ostello Care/60c3aad47065c579cac6631f",
  "/institute/SAUBHARI_SCIENCE_CLASSES/60f3e1617da10e17e0336961",
  "/institute/TACOCA CLASSES /60daf4221aa2c37d2a257a4c",
  "/institute/Matrix_Computers/60967eba8c75c308fb5dd701",
  "/institute/KTA/60cc70413ca59f17457856bd",
  "/ostello-blogs",
  "/ostello-blogs-single/60daf4bf1aa2c37d2a257a4f",
  "/institute/5f9a42e155512a047b48bc80",
  "/institute/pathfinder_computer_academy/602f4fcb4eaf3b077cb2efbf",
  "/institute/606726f3bba8c50aac081d61",
  "/institute/PEIT/60e55db91aa2c37d2a257acc",
  "/institute/CAD_GURU/606726f3bba8c50aac081d61",
  "/institute/Ostello_Care/60c3aad47065c579cac6631f",
  "/institute/Immortal_institute/60e4607b1aa2c37d2a257abd",
  "/institute/Ignite classes/602a77ec67078b0812d1f764",
  "/institute/Abc/61554e5998b01258f9545b83",
  "/createablog",
  "/institute/Genuine_Competition_Point/60f115067da10e17e0336931",
  "/institute/Pathfinder_Defence_Academy_Pvt_Ltd/60daf4fd1aa2c37d2a257a50",
  "/institute/VLC institute /60d188761aa2c37d2a2579e6",
  "/institute/602f4fcb4eaf3b077cb2efbf",
  "/institute/60dd9ce01aa2c37d2a257a66",
  "/ostello-blogs-single/3D_—_The_inevitable_shift/60e6ab1b1aa2c37d2a257ad9",
  "/ostello-blogs-single/Best_Architecture_Colleges_in_Delhi/610764967da10e17e0336a19",
  "/privacy-policy",
  "/ostello-blog/createBlog",
  "/ostello-blogs-single/60e7b07b1aa2c37d2a257ae8",
  "/institute/60c3aad47065c579cac6631f",
  "/ostello-blogs-single/TOP_10_PRIVATE_COLLEGES_IN_DELHI_FOR_BA/610ba5027da10e17e0336a28",
  "/institute#!",
  "/institute/60dad7bf1aa2c37d2a257a47",
  "/institute/Pathshala/60d2d65d1aa2c37d2a257a02",
  "/institute/Essence Point/60dad7bf1aa2c37d2a257a47",
  "/institute/New_Tughlakabad_institute/60db17af1aa2c37d2a257a56",
  "/tnc#!",
  "/institute/RCS_Memorial_Sr_Sec_School/60d1f7bf1aa2c37d2a2579f9",
  "/institute/RAY_COACHING/603890454eaf3b077cb2efcc",
  "/institute/CAD GURU/606726f3bba8c50aac081d61",
  "/institute/60db17af1aa2c37d2a257a56",
  "/institute/Gb_classes/6065d56cbba8c50aac081d59",
  "/institute/60ec1a77d25af3447b99017b",
  "/contactus",
  "/institute/60f2d0e77da10e17e0336950",
  "/institute/60e547831aa2c37d2a257ac8",
  "/institute/TARGET_LEARNING_CENTRE/60928c608c75c308fb5dd6ed",
  "/new-search/CoursesAndInstitutes",
  "/institute/roshan-jose-institute",
  "/courses_institutes",
  "/institute/Arth Institute/60e7163c1aa2c37d2a257ae3",
  "/institute/ROY COACHING /60d1d1931aa2c37d2a2579f3",
  "/course/1",
  "/new-career-page",
  "/institute/60ed94f8f846645950a3a513",
  "/institute/3234",
  "/institute/60e7f9c41aa2c37d2a257aef",
  "/institute/60b9dfa77ddee90b1a292224",
  "/search/development",
  "/institute/5f5f454f8569091b38331c97",
  "/new-search/MobileFilterBar",
  "/institute/60e4620b1aa2c37d2a257ac1",
  "/institute/Gb classes/6065d56cbba8c50aac081d59",
  "/institute/Indian_Public_Career_Institute/5feaa62b05683e1b44ed54c1",
  "/institute/BANSAL_ACADEMY_/5ff356498a551373d8c151f1",
  "/institute/Brain_booster_classes_/60f128af7da10e17e0336933",
  "/institute/_iish_/60d955f71aa2c37d2a257a31",
  "/institute/60f2e3f87da10e17e0336956",
  "/ostello-blogs-single/60e842081aa2c37d2a257af5",
  "/institute/apoorva-tuition",
  "/Support@ostello.co.in",
  "/search/engineering",
  "/ostello-blogs-single/Top_10_Medical_Colleges_in_Delhi:_2021_Updated_List_/6102ac897da10e17e0336a05",
  "/search/photography",
  "/institute/zenith-institute-of-humanities/course/history",
];
