import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("🌊 Seeding EasySurf database...");

  // ─── Locations ───────────────────────────────────────────────────────────────
  const locationsData = [
    {
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
      pickupInstructionsEn:
        "Pick up your board at the EasySurf kiosk at the Joaquina entrance (near the main parking lot). Show the reservation QR Code. Open 7am to 6pm.",
      returnInstructionsEn:
        "Return at the same kiosk by 6pm on the last day. Rinse the board with fresh water before handing it over.",
    },
    {
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
      pickupInstructionsEn:
        "Pick up at our partner store, Ubatuba Surf Shop. Show your reservation confirmation at the counter. Open 8am to 5pm.",
      returnInstructionsEn:
        "Return at the same store by the agreed time. If you arrive after hours, use the key safe at the side entrance.",
    },
    {
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
      pickupInstructionsEn:
        "Pick up at the Itacoatiara lifeguard station (right side of the beach). Open 6:30am to 5:30pm. Bring photo ID.",
      returnInstructionsEn:
        "Return at the same station. Any damage to the board must be reported on return.",
    },
    {
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
      pickupInstructionsEn:
        "Pick up at the EasySurf Point Maresias, on the main street facing the beach. Open 7am to 6pm.",
      returnInstructionsEn:
        "Return at the same spot. Boards should be clean and sand-free.",
    },
  ];

  const locations = await Promise.all(
    locationsData.map(({ id, ...data }) =>
      db.location.upsert({
        where: { id },
        update: data,
        create: { id, ...data },
      })
    )
  );

  const [floripa, ubatuba, itacoatiara, maresias] = locations;

  console.log(`✓ ${locations.length} locations created`);

  // ─── Surfboards ──────────────────────────────────────────────────────────────
  // 11 visuais distintos (prancha-01..11, front+back) distribuídos em 20 pranchas.
  // Cada localidade usa 5 imagens únicas — sem repetição na mesma página.
  const img = (n: string) => [`/boards/prancha-${n}-front.png`, `/boards/prancha-${n}-back.png`];
  const OLIVE = img("01");         // shortboard oliva (Surf's Up)
  const YELLOW = img("02");        // shortboard amarelo performance (Surf's Up)
  const BLUE_FISH = img("03");     // fish azul com rails vermelhos (FG)
  const TEAL_FISH = img("04");     // fish turquesa retrô com swallow
  const CAMPBELL = img("05");      // shortboard creme com rails sage e cauda de madeira
  const CI_SAGE = img("06");       // shortboard sage (Channel Islands)
  const MAHOGANY = img("07");      // twin fish mahogany (Album)
  const MUSTARD_FISH = img("08");  // fish mostarda (Elmore)
  const LOST_GREEN = img("09");    // shortboard branca com rails verdes (Lost)
  const ORANGE_LOG = img("10");    // longboard branco com rails laranja
  const DHD_PRO = img("11");       // shortboard pro branca (DHD)

  const boardsData = [
    // ─── Floripa – Joaquina (OLIVE, YELLOW, TEAL_FISH, ORANGE_LOG, DHD_PRO) ────
    {
      id: "board-rtx",
      name: "Joaquina All-Round 5'11",
      locationId: floripa.id,
      type: "SHORTBOARD" as const,
      shaper: "Surf's Up",
      size: "5'11\"",
      volumeLiters: 28.5,
      description:
        "Shortboard verde oliva com outline moderno, squash tail e concave duplo. Um all-round pensado para quem quer uma prancha única que surfa bem em qualquer dia mesclado.",
      conditionProfile:
        "Ondas de 0,8 a 1,8 metros. Para intermediários e avançados. Funciona muito bem na Joaquina com sul e leste.",
      descriptionEn:
        "Olive-green shortboard with modern outline, squash tail and double concave. An all-rounder for surfers who want a single board that handles any mixed-up day.",
      conditionProfileEn:
        "Waves from 0.8 to 1.8 meters. For intermediate to advanced surfers. Works great at Joaquina with south and east swells.",
      images: OLIVE,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-magic-diamond",
      name: "Phantom Pro 5'10",
      locationId: floripa.id,
      type: "SHORTBOARD" as const,
      shaper: "Surf's Up",
      size: "5'10\"",
      volumeLiters: 27.2,
      description:
        "Shortboard amarelo de alta performance. Nose agressivo, rails finos e rocker pronunciado. Feito para quem quer extrair o máximo de ondas de qualidade.",
      conditionProfile:
        "Ondas de 1 a 2 metros com boa forma. Para surfistas avançados. Dias de swell sul na Joaquina.",
      descriptionEn:
        "High-performance yellow shortboard. Aggressive nose, thin rails and pronounced rocker. Built to extract the most from quality waves.",
      conditionProfileEn:
        "Waves from 1 to 2 meters with good shape. For advanced surfers. South-swell days at Joaquina.",
      images: YELLOW,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-ultra-joe",
      name: "Teal Keel 5'8",
      locationId: floripa.id,
      type: "FISH" as const,
      shaper: "Neal Purchase Jr.",
      size: "5'8\"",
      volumeLiters: 34.5,
      description:
        "Fish turquesa com swallow tail profunda e sticker clássico de sol. Shape retrô dos anos 70 reinterpretado — glide longo e muito drive em ondas pequenas.",
      conditionProfile:
        "Para intermediários. Ondas de 0,5 a 1,2 metros. Perfeita em dias de swell fraco na Joaquina.",
      descriptionEn:
        "Teal fish with deep swallow tail and a classic sun sticker. A 70s retro shape reimagined — long glide and tons of drive in small waves.",
      conditionProfileEn:
        "For intermediate surfers. Waves from 0.5 to 1.2 meters. Perfect on small-swell days at Joaquina.",
      images: TEAL_FISH,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-chilli-rare",
      name: "DHD Team 5'11",
      locationId: floripa.id,
      type: "SHORTBOARD" as const,
      shaper: "DHD",
      size: "5'11\"",
      volumeLiters: 28.0,
      description:
        "Branca de competição full sticker — Hurley, Reef, FCS, GoPro. Shape de time, leve e nervosa, pronta para ondas sérias.",
      conditionProfile:
        "Para avançados. Ondas de 1,2 a 2,2 metros com parede. Dias clássicos de Joaquina.",
      descriptionEn:
        "White competition board, full sticker treatment — Hurley, Reef, FCS, GoPro. A team shape, light and twitchy, ready for serious waves.",
      conditionProfileEn:
        "For advanced surfers. Waves from 1.2 to 2.2 meters with a wall. Classic Joaquina days.",
      images: DHD_PRO,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-log-classic",
      name: "Sunrise Log 9'2",
      locationId: floripa.id,
      type: "LONGBOARD" as const,
      shaper: "Cooperfish",
      size: "9'2\"",
      volumeLiters: 80.0,
      description:
        "Longboard branco com rails laranja vibrantes. Pintail elegante e single fin para nose ride, cross-step e cruzadas no estilo californiano.",
      conditionProfile:
        "Para todos os níveis. Ondas de 0,5 a 1,2 metros com boa forma. Gostosa nos dias de sul fraco na Joaquina.",
      descriptionEn:
        "White longboard with vibrant orange rails. Elegant pintail and single fin for nose riding, cross-stepping and California-style cruising.",
      conditionProfileEn:
        "For all skill levels. Waves from 0.5 to 1.2 meters with good shape. Sweet on light south-swell days at Joaquina.",
      images: ORANGE_LOG,
      status: "AVAILABLE" as const,
    },

    // ─── Ubatuba – Praia Grande (BLUE_FISH, CAMPBELL, MAHOGANY, MUSTARD_FISH, LOST_GREEN)
    {
      id: "board-fish-retro",
      name: "Retro Twin 5'6",
      locationId: ubatuba.id,
      type: "FISH" as const,
      shaper: "FG Surfboards",
      size: "5'6\"",
      volumeLiters: 34.0,
      description:
        "Fish azul vibrante com rails vermelhos e swallow tail. Geração de velocidade absurda em ondas pequenas — um dos shapes mais divertidos da frota.",
      conditionProfile:
        "Ideal para ondas de 0,5 a 1,2 metros. Para intermediários. Perfeita em dias de verão em Ubatuba.",
      descriptionEn:
        "Vibrant blue fish with red rails and swallow tail. Insane speed generation in small waves — one of the most fun shapes in the fleet.",
      conditionProfileEn:
        "Ideal for waves from 0.5 to 1.2 meters. For intermediate surfers. Perfect on summer days in Ubatuba.",
      images: BLUE_FISH,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-grom-gun",
      name: "Puddle Jumper 5'9",
      locationId: ubatuba.id,
      type: "SHORTBOARD" as const,
      shaper: "Lost",
      size: "5'9\"",
      volumeLiters: 32.0,
      description:
        "Shape groveler da Lost com rails verdes fluorescentes. Muito volume e largura para gerar velocidade em ondas fracas e moles.",
      conditionProfile:
        "Para intermediários. Ondas de 0,5 a 1,3 metros. Ótima em Itamambuca e Praia Grande nos dias moles.",
      descriptionEn:
        "Lost groveler shape with fluorescent green rails. Plenty of volume and width to generate speed in weak, mushy waves.",
      conditionProfileEn:
        "For intermediate surfers. Waves from 0.5 to 1.3 meters. Great at Itamambuca and Praia Grande on mushy days.",
      images: LOST_GREEN,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-midlength",
      name: "Mahogany Twin 5'8",
      locationId: ubatuba.id,
      type: "FISH" as const,
      shaper: "Album Surf",
      size: "5'8\"",
      volumeLiters: 35.0,
      description:
        "Twin fin em tom mahogany profundo com laminação vintage. Linhas fluidas e estética setentista — para quem gosta de carving clássico.",
      conditionProfile:
        "Para intermediários. Ondas de 0,6 a 1,4 metros. Muito gostosa em Ubatuba no verão.",
      descriptionEn:
        "Twin fin in deep mahogany with vintage glassing. Fluid lines and 70s aesthetic — for surfers who love classic carving.",
      conditionProfileEn:
        "For intermediate surfers. Waves from 0.6 to 1.4 meters. Really fun in Ubatuba during summer.",
      images: MAHOGANY,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-step-up",
      name: "Campbell Bonzer 6'0",
      locationId: ubatuba.id,
      type: "SHORTBOARD" as const,
      shaper: "Campbell Brothers",
      size: "6'0\"",
      volumeLiters: 32.0,
      description:
        "Shape clássico dos irmãos Campbell em cor creme com rails sage e detalhe de madeira na cauda. Bonzer tradicional de 5 quilhas com drive único.",
      conditionProfile:
        "Para intermediários avançados. Ondas de 0,8 a 1,8 metros. Funciona muito bem em Praia Grande.",
      descriptionEn:
        "Classic Campbell Brothers shape in cream with sage rails and a wood-grain tail accent. Traditional 5-fin Bonzer with one-of-a-kind drive.",
      conditionProfileEn:
        "For advanced intermediates. Waves from 0.8 to 1.8 meters. Works really well at Praia Grande.",
      images: CAMPBELL,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-sup",
      name: "Elmore Fish 5'9",
      locationId: ubatuba.id,
      type: "FISH" as const,
      shaper: "Elmore",
      size: "5'9\"",
      volumeLiters: 36.0,
      description:
        "Fish mostarda com swallow tail pronunciada e acabamento fosco. Classicão da Elmore — drive, velocidade e muito glide.",
      conditionProfile:
        "Para intermediários. Ondas de 0,5 a 1,2 metros. Ótima nos dias menores de Ubatuba.",
      descriptionEn:
        "Mustard fish with pronounced swallow tail and matte finish. An Elmore classic — drive, speed and tons of glide.",
      conditionProfileEn:
        "For intermediate surfers. Waves from 0.5 to 1.2 meters. Great on smaller days in Ubatuba.",
      images: MUSTARD_FISH,
      status: "AVAILABLE" as const,
    },

    // ─── Itacoatiara – Niterói (CI_SAGE, MUSTARD_FISH, ORANGE_LOG, TEAL_FISH, CAMPBELL)
    {
      id: "board-ghost-writer",
      name: "CI Semi-Pro 5'11",
      locationId: itacoatiara.id,
      type: "SHORTBOARD" as const,
      shaper: "Channel Islands",
      size: "5'11\"",
      volumeLiters: 28.5,
      description:
        "Shortboard Channel Islands em cinza sage fosco. Outline de competição moderno com thruster de alta resposta. Elegante e letal.",
      conditionProfile:
        "Para avançados. Ondas de 1 a 2 metros. Perfeita para os dias de leste formado na Itacoatiara.",
      descriptionEn:
        "Channel Islands shortboard in matte sage gray. Modern competition outline with high-response thruster setup. Elegant and lethal.",
      conditionProfileEn:
        "For advanced surfers. Waves from 1 to 2 meters. Perfect for clean east-swell days at Itacoatiara.",
      images: CI_SAGE,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-omega",
      name: "Desert Fish 5'10",
      locationId: itacoatiara.id,
      type: "FISH" as const,
      shaper: "Elmore",
      size: "5'10\"",
      volumeLiters: 36.5,
      description:
        "Versão um pouco maior do fish mostarda. Mesma pegada setentista mas com mais volume para surfistas maiores ou dias menores.",
      conditionProfile:
        "Para intermediários. Ondas de 0,6 a 1,3 metros. Ótima na Itacoatiara e Camboinhas.",
      descriptionEn:
        "A slightly bigger take on the mustard fish. Same 70s feel, with more volume for larger surfers or smaller days.",
      conditionProfileEn:
        "For intermediate surfers. Waves from 0.6 to 1.3 meters. Great at Itacoatiara and Camboinhas.",
      images: MUSTARD_FISH,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-longboard-noserider",
      name: "Noserider Classic 9'4",
      locationId: itacoatiara.id,
      type: "LONGBOARD" as const,
      shaper: "Cooperfish",
      size: "9'4\"",
      volumeLiters: 83.0,
      description:
        "Longboard clássico branco com rails laranja. Single fin para nose ride puro — andar na ponta é a meta. Estilo californiano atemporal.",
      conditionProfile:
        "Para todos os níveis. Ondas de 0,5 a 1,5 metros. Muito gostosa nos dias de leste fraco na Itacoatiara.",
      descriptionEn:
        "Classic white longboard with orange rails. Single fin for pure nose riding — walking to the tip is the goal. Timeless California style.",
      conditionProfileEn:
        "For all skill levels. Waves from 0.5 to 1.5 meters. Really sweet on light east-swell days at Itacoatiara.",
      images: ORANGE_LOG,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-mini-simmons",
      name: "Sun Fish 5'6",
      locationId: itacoatiara.id,
      type: "FISH" as const,
      shaper: "Neal Purchase Jr.",
      size: "5'6\"",
      volumeLiters: 34.0,
      description:
        "Fish turquesa compacto com sticker de sol no peito. Muito volume em pouco comprimento — glide de longboard em corpo de fish.",
      conditionProfile:
        "Para intermediários. Ondas de 0,5 a 1 metro. Ótima nos dias calmos em Camboinhas e Piratininga.",
      descriptionEn:
        "Compact teal fish with a sun sticker on the chest. Lots of volume packed into a short length — longboard-like glide in a fish body.",
      conditionProfileEn:
        "For intermediate surfers. Waves from 0.5 to 1 meter. Great on calm days at Camboinhas and Piratininga.",
      images: TEAL_FISH,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-egg",
      name: "Campbell Dream 6'2",
      locationId: itacoatiara.id,
      type: "SHORTBOARD" as const,
      shaper: "Campbell Brothers",
      size: "6'2\"",
      volumeLiters: 35.0,
      description:
        "Segunda versão do Bonzer — um pouco maior, com mais volume. Shape versátil que combina clássico e moderno em cor creme com rails sage.",
      conditionProfile:
        "Para intermediários. Ondas de 0,6 a 1,6 metros. Muito boa para a transição entre dias pequenos e médios.",
      descriptionEn:
        "A bigger take on the Bonzer — a touch longer with more volume. Versatile shape blending classic and modern in cream with sage rails.",
      conditionProfileEn:
        "For intermediate surfers. Waves from 0.6 to 1.6 meters. Great for bridging small and medium-size days.",
      images: CAMPBELL,
      status: "AVAILABLE" as const,
    },

    // ─── Maresias – São Sebastião (OLIVE, YELLOW, BLUE_FISH, MAHOGANY, LOST_GREEN)
    {
      id: "board-hypto-krypto",
      name: "Hypto Krypto 5'10",
      locationId: maresias.id,
      type: "SHORTBOARD" as const,
      shaper: "Surf's Up",
      size: "5'10\"",
      volumeLiters: 29.5,
      description:
        "Shortboard oliva versátil. Wide point avançado, concave duplo e cauda de squash — funciona em tudo, desde ondas fracas até hollow.",
      conditionProfile:
        "Para intermediários e avançados. Ondas de 0,6 a 1,8 metros. Perfeita para as variadas condições de Maresias.",
      descriptionEn:
        "Versatile olive shortboard. Forward wide point, double concave and squash tail — works in everything from mushy waves to hollow ones.",
      conditionProfileEn:
        "For intermediate to advanced surfers. Waves from 0.6 to 1.8 meters. Perfect for the mixed conditions at Maresias.",
      images: OLIVE,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-lost-driver",
      name: "Driver 2.0",
      locationId: maresias.id,
      type: "SHORTBOARD" as const,
      shaper: "Surf's Up",
      size: "6'1\"",
      volumeLiters: 30.0,
      description:
        "Amarela de alta performance. Shape com foco em velocidade e drive — rails médios e concave simples para duplo. Popular entre competidores.",
      conditionProfile:
        "Para avançados. Ondas de 1 a 2 metros. Ótima nos dias bons de swell sul em Maresias.",
      descriptionEn:
        "High-performance yellow. Shape focused on speed and drive — medium rails and single-to-double concave. Popular among competitors.",
      conditionProfileEn:
        "For advanced surfers. Waves from 1 to 2 meters. Great on solid south-swell days at Maresias.",
      images: YELLOW,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-foil",
      name: "Lost RNF 5'7",
      locationId: maresias.id,
      type: "SHORTBOARD" as const,
      shaper: "Lost",
      size: "5'7\"",
      volumeLiters: 31.5,
      description:
        "Lost Round Nose Fish com rails verdes vibrantes. Groveler moderno super divertido em ondas menores. Solta, rápida, perdoadora.",
      conditionProfile:
        "Para intermediários. Ondas de 0,5 a 1,3 metros. Perfeita para os dias moles de Maresias.",
      descriptionEn:
        "Lost Round Nose Fish with vibrant green rails. Modern groveler, loads of fun in smaller waves. Loose, fast, forgiving.",
      conditionProfileEn:
        "For intermediate surfers. Waves from 0.5 to 1.3 meters. Perfect for mushy days at Maresias.",
      images: LOST_GREEN,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-ci-average-joe",
      name: "Mahogany Joe 6'0",
      locationId: maresias.id,
      type: "FISH" as const,
      shaper: "Album Surf",
      size: "6'0\"",
      volumeLiters: 38.0,
      description:
        "Fish Album em mahogany com mais comprimento e volume que a Twin clássica. Remada fácil e estilo clássico em dias de qualquer tamanho.",
      conditionProfile:
        "Para todos os níveis. Ondas de 0,5 a 1,5 metros. Perfeita para Maresias em dias de swell pequeno a médio.",
      descriptionEn:
        "Mahogany Album fish with more length and volume than the classic Twin. Easy paddling and classic style on any size day.",
      conditionProfileEn:
        "For all skill levels. Waves from 0.5 to 1.5 meters. Perfect for Maresias on small-to-medium swell days.",
      images: MAHOGANY,
      status: "AVAILABLE" as const,
    },
    {
      id: "board-longboard-perf",
      name: "Ocean Fish 5'9",
      locationId: maresias.id,
      type: "FISH" as const,
      shaper: "FG Surfboards",
      size: "5'9\"",
      volumeLiters: 36.0,
      description:
        "Fish azul com rails vermelhos e gráfica 'The Wave Never Ends'. Shape retrô com twin fin — carving clássico com estética moderna.",
      conditionProfile:
        "Para intermediários. Ondas de 0,5 a 1,3 metros. Ótima nos dias menores de Maresias.",
      descriptionEn:
        "Blue fish with red rails and 'The Wave Never Ends' graphic. Retro twin-fin shape — classic carving with modern aesthetics.",
      conditionProfileEn:
        "For intermediate surfers. Waves from 0.5 to 1.3 meters. Great on smaller days at Maresias.",
      images: BLUE_FISH,
      status: "AVAILABLE" as const,
    },
  ];

  let count = 0;
  for (const board of boardsData) {
    const { id, ...data } = board;
    await db.surfboard.upsert({
      where: { id },
      update: data,
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
