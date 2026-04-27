import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Նախդիրներ EN, A, DE (30 վարժություն)',
    description: 'Սովորենք օգտագործել ամենակարևոր նախդիրները',
    explanationIntro: 'EN = մեջ/վրա (տեղանք), A = դեպի (ուղղություն), DE = -ից/-ի (ծագում կամ պատկանելություն):',
    exercises: [
      { id: 'p1', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Voy ___ la playa.', target: 'a', choices: ['a', 'en', 'de'], translation: 'Գնում եմ լողափ:' },
      { id: 'p2', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Estoy ___ casa.', target: 'en', choices: ['en', 'a', 'de'], translation: 'Տանն եմ:' },
      { id: 'p3', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Soy ___ Armenia.', target: 'de', choices: ['de', 'a', 'en'], translation: 'Հայաստանից եմ:' },
      { id: 'p4', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Vivimos ___ Madrid.', target: 'en', choices: ['en', 'a', 'de'], translation: 'Ապրում ենք Մադրիդում:' },
      { id: 'p5', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'El libro es ___ Juan.', target: 'de', choices: ['de', 'a', 'en'], translation: 'Գիրքը Խուանինն է:' },
      { id: 'p6', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Llegamos ___ las diez.', target: 'a', choices: ['a', 'en', 'de'], translation: 'Ժամանեցինք ժամը տասին:' },
      { id: 'p7', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Vengo ___ la oficina.', target: 'de', choices: ['de', 'a', 'en'], translation: 'Գալիս եմ գրասենյակից:' },
      { id: 'p8', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Hay agua ___ el vaso.', target: 'en', choices: ['en', 'de', 'a'], translation: 'Բաժակի մեջ ջուր կա:' },
      { id: 'p9', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Mira ___ la ventana.', target: 'por', choices: ['por', 'en', 'de'], translation: 'Նայիր պատուհանից:', explanation: 'Por-ը նշանակում է "միջով" կամ "միջոցով":' },
      { id: 'p10', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Vamos ___ coche.', target: 'en', choices: ['en', 'a', 'con'], translation: 'Մեքենայով ենք գնում:' },
      { id: 'p11', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Doy flores ___ María.', target: 'a', choices: ['a', 'de', 'en'], translation: 'Մարիային ծաղիկներ եմ տալիս:' },
      { id: 'p12', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Es la mesa ___ madera.', target: 'de', choices: ['de', 'en', 'a'], translation: 'Փայտե սեղան է:' },
      { id: 'p13', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Estamos ___ enero.', target: 'en', choices: ['en', 'de', 'a'], translation: 'Հունվար ամսին ենք:' },
      { id: 'p14', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Voy ___ comprar pan.', target: 'a', choices: ['a', 'en', 'de'], translation: 'Գնում եմ հաց գնելու:' },
      { id: 'p15', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Vivo ___ un piso.', target: 'en', choices: ['en', 'de', 'a'], translation: 'Ապրում եմ բնակարանում:' },
      { id: 'p16', type: 'SELECT', instruction: 'Ընտրեք նախդիրը', prompt: 'Salgo ___ casa.', target: 'de', choices: ['de', 'a', 'en'], translation: 'Դուրս եմ գալիս տանից:' },
      { id: 'p17', type: 'SELECT', instruction: 'Ընտրեք նախդիրը', prompt: 'Entro ___ la sala.', target: 'en', choices: ['en', 'a', 'de'], translation: 'Մտնում եմ սենյակ:' },
      { id: 'p18', type: 'SELECT', instruction: 'Ընտրեք նախդիրը', prompt: 'Subo ___ el metro.', target: 'en', choices: ['en', 'a', 'de'], translation: 'Բարձրանում եմ մետրո:' },
      { id: 'p19', type: 'SELECT', instruction: 'Ընտրեք նախդիրը', prompt: 'Voy ___ pie.', target: 'a', choices: ['a', 'en', 'de'], translation: 'Ոտքով եմ գնում:' },
      { id: 'p20', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Ես Մադրիդից եմ', target: 'Soy de Madrid', scrambledWords: ['de', 'Soy', 'Madrid'], translation: 'Soy de Madrid' },
      { id: 'p21', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Pongo la sal ___ la comida.', target: 'en', choices: ['en', 'de', 'a'], translation: 'Աղը դնում եմ ուտելիքի մեջ:' },
      { id: 'p22', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Llamo ___ mi madre.', target: 'a', choices: ['a', 'de', 'en'], translation: 'Զանգում եմ մորս:' },
      { id: 'p23', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Vengo ___ la playa.', target: 'de', choices: ['de', 'a', 'en'], translation: 'Լողափից եմ գալիս:' },
      { id: 'p24', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Duermo ___ el sofá.', target: 'en', choices: ['en', 'a', 'de'], translation: 'Քնում եմ բազմոցի վրա:' },
      { id: 'p25', type: 'FILL', instruction: 'Լրացրեք նախդիրը', prompt: 'Voy ___ la tienda.', target: 'a', choices: ['a', 'en', 'de'], translation: 'Գնում եմ խանութ:' },
      { id: 'p26', type: 'SELECT', instruction: 'Ընտրեք նախդիրը', prompt: 'Escribo ___ español.', target: 'en', choices: ['en', 'de', 'a'], translation: 'Իսպաներենով եմ գրում:' },
      { id: 'p27', type: 'SELECT', instruction: 'Ընտրեք նախդիրը', prompt: 'Hablo ___ ti.', target: 'de', choices: ['de', 'en', 'a'], translation: 'Խոսում եմ քո մասին:' },
      { id: 'p28', type: 'SELECT', instruction: 'Ընտրեք նախդիրը', prompt: 'Leo ___ la noche.', target: 'en', choices: ['en', 'de', 'a'], translation: 'Գիշերն եմ կարդում:' },
      { id: 'p29', type: 'SELECT', instruction: 'Ընտրեք նախդիրը', prompt: 'Espera ___ el bus.', target: 'en', choices: ['en', 'a', 'de'], translation: 'Սպասում է ավտոբուսում/ավտոբուսին:' },
      { id: 'p30', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Գիրքը սեղանի վրա է', target: 'El libro está en la mesa', scrambledWords: ['en', 'está', 'libro', 'El', 'la', 'mesa'], translation: 'El libro está en la mesa' }
    ]
  },
  {
    id: 2,
    title: 'Գույներ (30 վարժություն)',
    description: 'Սովորենք գույները և նրանց համաձայնեցումը',
    explanationIntro: 'Իսպաներենում գույները դրվում են գոյականից հետո և համապատասխանում են սեռին/թվին (օրինակ՝ rojo, roja, rojos, rojas):',
    exercises: [
      { id: 'c1', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Rojo', target: 'Կարմիր', choices: ['Կարմիր', 'Կապույտ', 'Կանաչ'] },
      { id: 'c2', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Azul', target: 'Կապույտ', choices: ['Կապույտ', 'Դեղին', 'Սև'] },
      { id: 'c3', type: 'FILL', instruction: 'Լրացրեք սեռը', prompt: 'La pared es blanc__.', target: 'a', choices: ['a', 'o', 'as'], translation: 'Պատը սպիտակ է:' },
      { id: 'c4', type: 'FILL', instruction: 'Լրացրեք սեռը', prompt: 'El coche es roj__.', target: 'o', choices: ['o', 'a', 'os'], translation: 'Մեքենան կարմիր է:' },
      { id: 'c5', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Verde', target: 'Կանաչ', choices: ['Կանաչ', 'Սև', 'Դեղին'] },
      { id: 'c6', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Amarillo', target: 'Դեղին', choices: ['Դեղին', 'Կարմիր', 'Սպիտակ'] },
      { id: 'c7', type: 'FILL', instruction: 'Լրացրեք հոգնակին', prompt: 'Los ojos ___ (կապույտ).', target: 'azules', choices: ['azules', 'azuls', 'azulas'], translation: 'Կապույտ աչքեր:' },
      { id: 'c8', type: 'FILL', instruction: 'Լրացրեք իգականը', prompt: 'La rosa է ___ (կարմիր):', target: 'roja', choices: ['roja', 'rojo', 'rojas'], translation: 'Վարդը կարմիր է:' },
      { id: 'c9', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Negro', target: 'Սև', choices: ['Սև', 'Գորշ', 'Շագանակագույն'] },
      { id: 'c10', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Blanco', target: 'Սպիտակ', choices: ['Սպիտակ', 'Սև', 'Մոխրագույն'] },
      { id: 'c11', type: 'FILL', instruction: 'Լրացրեք հոգնակին', prompt: 'Las nubes son ___ (սպիտակ):', target: 'blancas', choices: ['blancas', 'blanca', 'blancos'], translation: 'Ամպերը սպիտակ են:' },
      { id: 'c12', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Naranja', target: 'Նարնջագույն', choices: ['Նարնջագույն', 'Դեղին', 'Կարմիր'] },
      { id: 'c13', type: 'FILL', instruction: 'Լրացրեք ճիշտը', prompt: 'La hierba es ___ (կանաչ):', target: 'verde', choices: ['verde', 'verda', 'verdes'], translation: 'Խոտը կանաչ է:' },
      { id: 'c14', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Gris', target: 'Մոխրագույն', choices: ['Մոխրագույն', 'Կապույտ', 'Կանաչ'] },
      { id: 'c15', type: 'FILL', instruction: 'Լրացրեք հոգնակին', prompt: 'Los gatos son ___ (գորշ):', target: 'grises', choices: ['grises', 'gris', 'grisas'] },
      { id: 'c16', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Marrón', target: 'Շագանակագույն', choices: ['Շագանակագույն', 'Նարնջագույն', 'Սև'] },
      { id: 'c17', type: 'FILL', instruction: 'Լրացրեք իգականը', prompt: 'La silla է ___ (շագանակագույն):', target: 'marrón', choices: ['marrón', 'marrona', 'marrones'] },
      { id: 'c18', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Rosa', target: 'Վարդագույն', choices: ['Վարդագույն', 'Մանուշակագույն', 'Կապույտ'] },
      { id: 'c19', type: 'FILL', instruction: 'Լրացրեք հոգնակին', prompt: 'Los zapatos ___ (սև):', target: 'negros', choices: ['negros', 'negra', 'negro'] },
      { id: 'c20', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Երկինքը կապույտ է', target: 'El cielo es azul', scrambledWords: ['azul', 'el', 'cielo', 'El', 'es'] },
      { id: 'c21', type: 'FILL', instruction: 'Լրացրեք գույնը', prompt: 'La leche es ___ (սպիտակ):', target: 'blanca', choices: ['blanca', 'blanco', 'blancas'] },
      { id: 'c22', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Morado', target: 'Մանուշակագույն', choices: ['Մանուշակագույն', 'Վարդագույն', 'Կարմիր'] },
      { id: 'c23', type: 'FILL', instruction: 'Լրացրեք հոգնակին', prompt: 'Las uvas son ___ (մանուշակագույն):', target: 'moradas', choices: ['moradas', 'morada', 'morados'] },
      { id: 'c24', type: 'FILL', instruction: 'Լրացրեք գույնը', prompt: 'El sol es ___ (դեղին):', target: 'amarillo', choices: ['amarillo', 'amarilla', 'amarillos'] },
      { id: 'c25', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Bronce', target: 'Բրոնզագույն', choices: ['Բրոնզագույն', 'Ոսկեգույն', 'Արծաթագույն'] },
      { id: 'c26', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Plateado', target: 'Արծաթագույն', choices: ['Արծաթագույն', 'Ոսկեգույն', 'Բրոնզագույն'] },
      { id: 'c27', type: 'FILL', instruction: 'Լրացրեք հոգնակին', prompt: 'Coches ___ (կարմիր):', target: 'rojos', choices: ['rojos', 'roja', 'rojo'] },
      { id: 'c28', type: 'SELECT', instruction: 'Ընտրեք գույնը', prompt: 'Dorado', target: 'Ոսկեգույն', choices: ['Ոսկեգույն', 'Արծաթագույն', 'Դեղին'] },
      { id: 'c29', type: 'FILL', instruction: 'Լրացրեք իգականը', prompt: 'Manzana ___ (կանաչ):', target: 'verde', choices: ['verde', 'verda', 'verdes'] },
      { id: 'c30', type: 'SCRAMBLE', instruction: 'Կազմեք նախադասությունը', prompt: 'Գիշերը սև է', target: 'La noche es negra', scrambledWords: ['negra', 'noche', 'es', 'La'] }
    ]
  },
  {
    id: 3,
    title: 'Գտնել Փոփոխվողները',
    description: 'Ընտրեք այն բառերը, որոնց վերջավորությունը փոխվում է ըստ սեռի',
    explanationIntro: 'Այս վարժության մեջ ընտրե՛ք այն բոլոր բառերը, որոնք ունեն և՛ արական, և՛ իգական ձևեր (սովորաբար վերջանում են -o կամ -a):',
    exercises: [
      {
        id: 'fa-1',
        type: 'FIND_ALL',
        instruction: 'Ընտրեք այն գույները, որոնք փոխում են իրենց սեռը (-O/-A)',
        prompt: 'Գտեք փոփոխվող գույները',
        target: '',
        targets: ['Rojo', 'Blanco', 'Negro', 'Amarillo'],
        choices: ['Rojo', 'Azul', 'Blanco', 'Verde', 'Negro', 'Gris', 'Amarillo', 'Marrón'],
        explanation: 'Rojo/Roja, Blanco/Blanca, Negro/Negra, Amarillo/Amarilla փոխվում են: Azul, Verde, Gris, Marrón մնում են նույնը:'
      },
      {
        id: 'fa-2',
        type: 'FIND_ALL',
        instruction: 'Ընտրեք այն ածականները, որոնք փոխում են իրենց սեռը',
        prompt: 'Գտեք փոփոխվող ածականները',
        target: '',
        targets: ['Pequeño', 'Nuevo', 'Bonito', 'Alto'],
        choices: ['Pequeño', 'Grande', 'Nuevo', 'Fácil', 'Bonito', 'Inteligente', 'Alto', 'Difícil'],
        explanation: 'Pequeño, Nuevo, Bonito, Alto բառերը -o-ով են վերջանում, ուստի ունեն իգական ձև (-a):'
      },
      {
        id: 'fa-3',
        type: 'FIND_ALL',
        instruction: 'Ընտրեք ԲՈԼՈՐ փոփոխվող բառերը',
        prompt: 'Գտեք բոլոր փոփոխվողները',
        target: '',
        targets: ['Gordo', 'Flaco', 'Limpio', 'Sucio'],
        choices: ['Gordo', 'Elegante', 'Flaco', 'Importante', 'Limpio', 'Interesante', 'Sucio', 'Puntual'],
        explanation: 'Gordo, Flaco, Limpio, Sucio բառերը փոխվում են: Elegante, Importante, Interesante, Puntual չեն փոխվում (վերջանում են -e կամ բաղաձայնով):'
      }
    ]
  }
];

export const VOCABULARY = [
  { id: 'v1', es: 'Rojo', hy: 'Կարմիր' },
  { id: 'v2', es: 'Azul', hy: 'Կապույտ' },
  { id: 'v3', es: 'En', hy: 'Մեջ/Վրա' },
  { id: 'v4', es: 'A', hy: 'Դեպի' },
  { id: 'v5', es: 'De', hy: 'Ից/Մասին' },
];
