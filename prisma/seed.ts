import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("🌊 Seeding EasySurf database...");

  // ─── Locations ───────────────────────────────────────────────────────────────
  const locations = await Promise.all([
    db.location.upsert({
      where: { id: "loc-floripa" },
      update: {},
      create: {
        id: "loc-floripa",
        city: "Florianópolis",
        town: "Joaquina",
        address: "Praia da Joaquina, s/n – Campeche, Florianópolis – SC",
        latitude: -27.6428,
        longitude: -48.4781,
        pickupInstructions:
          "Retire a prancha no quiosque EasySurf na entrada da Joaquina (próximo ao estacionamento principal). Apresente o QR Code da reserva. Horário: 7h às 18h.",
        returnInstructions:
          "Devolva no mesmo quiosque até às 18h do último dia. Enxágue a prancha com água doce antes de entregar.",
      },
    }),
    db.location.upsert({
      where: { id: "loc-ubatuba" },
      update: {},
      create: {
        id: "loc-ubatuba",
        city: "Ubatuba",
        town: "Praia Grande",
        address: "Av. Leovigildo Dias Vieira, 3986 – Praia Grande, Ubatuba – SP",
        latitude: -23.4336,
        longitude: -45.0838,
        pickupInstructions:
          "Retirada na loja parceira Ubatuba Surf Shop. Mostre a confirmação de reserva no balcão. Aberto das 8h às 17h.",
        returnInstructions:
          "Devolva na mesma loja no prazo combinado. Caso chegue fora do horário, utilize o cofre de chaves na entrada lateral.",
      },
    }),
    db.location.upsert({
      where: { id: "loc-itacoatiara" },
      update: {},
      create: {
        id: "loc-itacoatiara",
        city: "Niterói",
        town: "Itacoatiara",
        address: "Estrada Francisco da Cruz Nunes, s/n – Itacoatiara, Niterói – RJ",
        latitude: -22.9512,
        longitude: -43.0299,
        pickupInstructions:
          "Retire no posto de guarda-vidas da Itacoatiara (lado direito da praia). Horário: 6h30 às 17h30. Leve documento com foto.",
        returnInstructions:
          "Devolva no mesmo posto. Pranchas com danos devem ser reportadas na entrega.",
      },
    }),
    db.location.upsert({
      where: { id: "loc-maresias" },
      update: {},
      create: {
        id: "loc-maresias",
        city: "São Sebastião",
        town: "Maresias",
        address: "Rua Jequitibá, 150 – Maresias, São Sebastião – SP",
        latitude: -23.8036,
        longitude: -45.5392,
        pickupInstructions:
          "Retirada no EasySurf Point Maresias, na rua principal em frente à praia. Horário: 7h às 18h.",
        returnInstructions:
          "Devolva no mesmo ponto. Pranchas devem estar limpas e sem areia.",
      },
    }),
  ]);

  const [floripa, ubatuba, itacoatiara, maresias] = locations;

  console.log(`✓ ${locations.length} locations created`);

  // ─── Surfboards ──────────────────────────────────────────────────────────────
  const boardsData = [
    // Floripa – Joaquina
    {
      id: "board-rtx",
      name: "RTX",
      locationId: floripa.id,
      type: "SHORTBOARD" as const,
      shaper: "DHD",
      size: "5'11\"",
      volumeLiters: 27.0,
      description:
        "Shortboard de alta performance com design moderno. Rocker médio, canais na cauda e concave duplo. Ideal para surfistas que querem tirar o máximo de ondas de qualidade.",
      conditionProfile:
        "Melhor em ondas de 1 a 2 metros com boa forma. Indicada para surfistas intermediários a avançados. Funciona bem em Joaquina com sul e leste.",
      images: ["/boards/prancha-01-front.png", "/boards/prancha-01-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-magic-diamond",
      name: "Magic Diamond",
      locationId: floripa.id,
      type: "SHORTBOARD" as const,
      shaper: "Lost",
      size: "5'8\"",
      volumeLiters: 27.0,
      description:
        "Um dos shapes mais vendidos da Lost. Versátil, perdoador e rápido. Ótima opção para quem quer um shortboard que funciona em várias condições.",
      conditionProfile:
        "Funciona em ondas de 0,5 a 1,5 metros. Para surfistas intermediários. Ótima prancha para praias com surf mais mesclado como a Joaquina em dias de ondas menores.",
      images: ["/boards/prancha-02-front.png", "/boards/prancha-02-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-ultra-joe",
      name: "Ultra Joe",
      locationId: floripa.id,
      type: "FUNBOARD" as const,
      shaper: "Firewire",
      size: "7'0\"",
      volumeLiters: 52.0,
      description:
        "Funboard clássico com bastante volume para facilitar a remada e o equilíbrio. Perfeito para quem está aprendendo ou quer uma sessão mais relaxada.",
      conditionProfile:
        "Ideal para iniciantes e intermediários. Funciona muito bem em ondas de 0,5 a 1 metro. Ótimo para a Joaquina nos dias de swell mais fraco.",
      images: ["/boards/prancha-03-front.png", "/boards/prancha-03-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-chilli-rare",
      name: "Rare Form",
      locationId: floripa.id,
      type: "SHORTBOARD" as const,
      shaper: "Chilli",
      size: "6'0\"",
      volumeLiters: 30.5,
      description:
        "Shape moderno da Chilli com muita estabilidade sem perder resposta. Bom para manobras e geração de velocidade em ondas menores.",
      conditionProfile:
        "Para intermediários a avançados. Ondas de 0,8 a 1,5 metros. Funciona bem na Joaquina e na Brava.",
      images: ["/boards/prancha-01-front.png", "/boards/prancha-01-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-log-classic",
      name: "Log Clássico 9'0",
      locationId: floripa.id,
      type: "LONGBOARD" as const,
      shaper: "Channel Islands",
      size: "9'0\"",
      volumeLiters: 78.0,
      description:
        "Longboard clássico com single fin. Ótimo para nose ride, cruzadas e o surf mais estiloso. Feito para quem quer aproveitar cada onda com calma.",
      conditionProfile:
        "Para todos os níveis — iniciantes adoram a estabilidade, avançados exploram o estilo. Ondas de 0,5 a 1,2 metros com boa forma.",
      images: ["/boards/prancha-02-front.png", "/boards/prancha-02-back.png"],
      status: "AVAILABLE" as const,
    },

    // Ubatuba – Praia Grande
    {
      id: "board-fish-retro",
      name: "Fish Retrô 5'6",
      locationId: ubatuba.id,
      type: "FISH" as const,
      shaper: "Album Surf",
      size: "5'6\"",
      volumeLiters: 34.0,
      description:
        "Fish retrô com nose largo e cauda de swallow. Geração de velocidade absurda em ondas pequenas. Um dos shapes mais divertidos para dias de swell fraco.",
      conditionProfile:
        "Ideal para ondas de 0,5 a 1 metro. Para intermediários. Perfeito para a Praia Grande de Ubatuba nos dias de verão com ondas menores.",
      images: ["/boards/prancha-03-front.png", "/boards/prancha-03-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-grom-gun",
      name: "Grom Gun 6'8",
      locationId: ubatuba.id,
      type: "GUN" as const,
      shaper: "Rusty",
      size: "6'8\"",
      volumeLiters: 38.0,
      description:
        "Semi-gun para ondas maiores. Rocker mais pronunciado, rails fechados e outline de gun. Para quem quer entrar em ondas mais sérias com segurança.",
      conditionProfile:
        "Para surfistas avançados. Ondas de 1,5 a 2,5 metros. Indicada para dias de bom swell em Ubatuba.",
      images: ["/boards/prancha-01-front.png", "/boards/prancha-01-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-midlength",
      name: "Mid Length 7'4",
      locationId: ubatuba.id,
      type: "FUNBOARD" as const,
      shaper: "Hayden Shapes",
      size: "7'4\"",
      volumeLiters: 57.0,
      description:
        "Mid length versátil que se adapta a vários estilos de surf. Combina a remada do longboard com a mobilidade do shortboard.",
      conditionProfile:
        "Para todos os níveis. Ondas de 0,5 a 1,5 metros. Muito boa nos dias mesclados de Ubatuba.",
      images: ["/boards/prancha-02-front.png", "/boards/prancha-02-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-step-up",
      name: "Step Up 6'2",
      locationId: ubatuba.id,
      type: "SHORTBOARD" as const,
      shaper: "JS Industries",
      size: "6'2\"",
      volumeLiters: 32.0,
      description:
        "Step up para ondas um pouco maiores. Mais comprimento e rocker para controle em ondas hollow. Ótimo para quem quer progredir.",
      conditionProfile:
        "Para intermediários avançados. Ondas de 1 a 2 metros. Perfeita para os dias bons de Itamambuca e Praia Grande.",
      images: ["/boards/prancha-03-front.png", "/boards/prancha-03-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-sup",
      name: "SUP Explorer 10'6",
      locationId: ubatuba.id,
      type: "SUP" as const,
      shaper: "Red Paddle",
      size: "10'6\"",
      volumeLiters: 210.0,
      description:
        "Stand Up Paddle para surf e passeio. Excelente para explorar as enseadas de Ubatuba. Vem com remo incluso.",
      conditionProfile:
        "Para todos os níveis. Funciona em qualquer condição de mar calmo a pequenas ondas. Ótimo para iniciantes ou para treino de remada.",
      images: ["/boards/prancha-01-front.png", "/boards/prancha-01-back.png"],
      status: "AVAILABLE" as const,
    },

    // Itacoatiara – Niterói
    {
      id: "board-ghost-writer",
      name: "Ghost Writer",
      locationId: itacoatiara.id,
      type: "SHORTBOARD" as const,
      shaper: "DHD",
      size: "5'10\"",
      volumeLiters: 26.5,
      description:
        "Performance shortboard projetado para ondas pesadas e hollow. Resposta rápida, muito drive nas raias e controle em ondas de potência.",
      conditionProfile:
        "Para surfistas avançados. Ondas de 1,2 a 2,5 metros. Perfeito para a Itacoatiara nos dias de bom swell de leste.",
      images: ["/boards/prancha-02-front.png", "/boards/prancha-02-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-omega",
      name: "Omega 5'9",
      locationId: itacoatiara.id,
      type: "SHORTBOARD" as const,
      shaper: "Pyzel",
      size: "5'9\"",
      volumeLiters: 28.0,
      description:
        "Um dos shapes mais populares da Pyzel. Ótimo para surfistas que querem progressão. Estável o suficiente para intermediários mas dinâmico para avançados.",
      conditionProfile:
        "Para intermediários e avançados. Ondas de 0,8 a 1,8 metros. Funciona bem na Itacoatiara e na Camboinhas.",
      images: ["/boards/prancha-03-front.png", "/boards/prancha-03-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-longboard-noserider",
      name: "Noserider Classic 9'2",
      locationId: itacoatiara.id,
      type: "LONGBOARD" as const,
      shaper: "Thomas Surfboards",
      size: "9'2\"",
      volumeLiters: 82.0,
      description:
        "Longboard noserider com concave no nose e single fin. Projetado para andar na ponta. Muito popular no estilo clássico californiano.",
      conditionProfile:
        "Para todos os níveis. Ondas pequenas a médias com boa forma, 0,5 a 1,5 metros. Muito gostosa nos dias de leste fraco na Itacoatiara.",
      images: ["/boards/prancha-01-front.png", "/boards/prancha-01-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-mini-simmons",
      name: "Mini Simmons 5'4",
      locationId: itacoatiara.id,
      type: "FISH" as const,
      shaper: "Stretch",
      size: "5'4\"",
      volumeLiters: 36.0,
      description:
        "Mini Simmons com volume alto e outline super largo. Glide incrível em ondas pequenas. Uma das pranchas mais divertidas que existem.",
      conditionProfile:
        "Para intermediários. Ondas de 0,5 a 1 metro. Ótima nos dias de swell fraco na Itacoatiara e Piratininga.",
      images: ["/boards/prancha-02-front.png", "/boards/prancha-02-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-egg",
      name: "Egg 6'6",
      locationId: itacoatiara.id,
      type: "FUNBOARD" as const,
      shaper: "Album Surf",
      size: "6'6\"",
      volumeLiters: 46.0,
      description:
        "Egg com outline arredondado e volume distribuído. Estável, fácil de remar e muito versátil. A prancha certa para quem quer se divertir sem stress.",
      conditionProfile:
        "Para iniciantes e intermediários. Qualquer condição de 0,5 a 1,5 metros. Muito indicada para quem está fazendo a transição do funboard para o shortboard.",
      images: ["/boards/prancha-03-front.png", "/boards/prancha-03-back.png"],
      status: "AVAILABLE" as const,
    },

    // Maresias – São Sebastião
    {
      id: "board-hypto-krypto",
      name: "Hypto Krypto",
      locationId: maresias.id,
      type: "SHORTBOARD" as const,
      shaper: "Haydenshapes",
      size: "5'10\"",
      volumeLiters: 33.4,
      description:
        "O shape mais famoso da Haydenshapes. Versatilidade máxima — funciona em tudo. Wide point avançado, concave duplo e cauda de squash.",
      conditionProfile:
        "Para todos os níveis intermediários e acima. Ondas de 0,6 a 1,8 metros. Perfeito para as variadas condições de Maresias.",
      images: ["/boards/prancha-01-front.png", "/boards/prancha-01-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-lost-driver",
      name: "Driver 2.0",
      locationId: maresias.id,
      type: "SHORTBOARD" as const,
      shaper: "Lost",
      size: "6'1\"",
      volumeLiters: 35.0,
      description:
        "Shape de alta performance da Lost com foco em velocidade e drive. Rails médios, concave simples para duplo. Muito popular entre surfistas de competição.",
      conditionProfile:
        "Para intermediários avançados e profissionais. Ondas de 1 a 2 metros. Ótima nos dias bons de swell sul em Maresias.",
      images: ["/boards/prancha-02-front.png", "/boards/prancha-02-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-foil",
      name: "Foil Board 4'10",
      locationId: maresias.id,
      type: "FOIL" as const,
      shaper: "Lift Foils",
      size: "4'10\"",
      volumeLiters: 20.0,
      description:
        "Board para hydrofoil surf. Projetado para uso com foil subaquático (não incluso). Para quem quer experimentar a nova fronteira do surf.",
      conditionProfile:
        "Para surfistas avançados com experiência em foil. Funciona em qualquer condição, inclusive ondas muito pequenas de 0,3 a 0,8 metros.",
      images: ["/boards/prancha-03-front.png", "/boards/prancha-03-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-ci-average-joe",
      name: "Average Joe 6'4",
      locationId: maresias.id,
      type: "FUNBOARD" as const,
      shaper: "Channel Islands",
      size: "6'4\"",
      volumeLiters: 42.0,
      description:
        "Mid-length da Channel Islands com muito volume e outline generoso. Remada fácil e surf descontraído. A prancha ideal para as sessões sem pressão.",
      conditionProfile:
        "Para todos os níveis. Ondas de 0,5 a 1,5 metros. Perfeita para Maresias em dias de swell pequeno a médio.",
      images: ["/boards/prancha-01-front.png", "/boards/prancha-01-back.png"],
      status: "AVAILABLE" as const,
    },
    {
      id: "board-longboard-perf",
      name: "Performance Longboard 9'4",
      locationId: maresias.id,
      type: "LONGBOARD" as const,
      shaper: "Cooperfish",
      size: "9'4\"",
      volumeLiters: 85.0,
      description:
        "Longboard performance com trilha de 3 fins. Permite surf mais agressivo que o longboard clássico. Ótimo para quem quer evoluir no longboard.",
      conditionProfile:
        "Para intermediários a avançados no longboard. Ondas de 0,5 a 1,5 metros com boa forma. Excelente na maré mais alta de Maresias.",
      images: ["/boards/prancha-02-front.png", "/boards/prancha-02-back.png"],
      status: "AVAILABLE" as const,
    },
  ];

  let count = 0;
  for (const board of boardsData) {
    await db.surfboard.upsert({
      where: { id: board.id },
      update: { images: board.images },
      create: board,
    });
    count++;
  }

  console.log(`✓ ${count} surfboards created`);
  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
