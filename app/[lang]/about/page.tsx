import type { Metadata } from "next";
import Image from "next/image";
import {
  CTASection,
  FeatureStrip,
  ImageBand,
  PageShell,
} from "@/components/site";
import { getLang, type LangParams } from "@/lib/i18n";
import { images } from "@/lib/images";
import { pageAlternates } from "@/lib/site";
import { team } from "@/lib/team";

const meta = {
  ar: {
    title: "من نحن",
    description:
      "زعفرانكم شركة متخصصة في إنتاج وتسويق الزعفران ومنتجاته، بزراعة هوائية محلية في مؤاب وعناية حقيقية بالأرض.",
  },
  en: {
    title: "About Us",
    description:
      "zafraancom is a company that produces and markets saffron and its products, grown locally with real care for the land.",
  },
};

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return { ...meta[lang], alternates: pageAlternates(lang, "/about") };
}

const story = {
  ar: [
    "في زعفرانكم نزرع الزعفران بالطريقة الهوائية، حيث تنمو الأبصال معلّقة في الهواء وتتغذّى على رذاذ مغذٍّ بدل التربة، في بيئة مضبوطة تحمي الزهرة وتمنحنا زعفرانًا نقيًا.",
    "يقوم على هذا العمل فريق أردني بأيدٍ أردنية، من الزراعة إلى القطف اليدوي والتجفيف والتعبئة، تحت إشراف مهندسين أردنيين متخصصين يتابعون كل مرحلة لنضمن جودة ثابتة ونكهة أصيلة.",
    "هكذا يصلكم زعفران أردني محلي، صُنع بخبرة أبناء الوطن ويصل إلى طاولتكم.",
  ],
  en: [
    "At zafraancom, we grow saffron aeroponically: the bulbs grow suspended in the air and are fed with a nutrient mist instead of soil, in a controlled environment that protects the flower and gives us pure saffron.",
    "The work is carried out by Jordanian hands, from cultivation to hand-picking, drying and packaging, under the supervision of specialized Jordanian engineers who follow every stage to ensure consistent quality and authentic flavor.",
    "This is how locally grown Jordanian saffron, made with the expertise of our own people, reaches your table.",
  ],
};

const steps = {
  ar: [
    ["البصلة", "نبدأ بأبصال زعفران محلية مختارة بعناية."],
    ["الزراعة الهوائية", "تنمو الأبصال معلّقة في الهواء، وتتغذّى جذورها على رذاذ مغذٍّ بدل التربة، في بيئة مضبوطة."],
    ["الإزهار", "تتفتح زهرة الزعفران البنفسجية، وفي قلب كل زهرة ثلاثة مياسم حمراء هي الزعفران."],
    ["القطف اليدوي", "تُقطف المياسم باليد، واحدة واحدة، بأيدٍ أردنية خبيرة."],
    ["التجفيف والتعبئة", "تُجفَّف المياسم بعناية للحفاظ على لونها ونكهتها، ثم تُعبّأ في عبوات تحفظها حتى تصل إليكم."],
  ],
  en: [
    ["The bulb", "We start with carefully selected local saffron bulbs."],
    ["Aeroponic growing", "The bulbs grow suspended in the air, and their roots are fed with a nutrient mist instead of soil, in a controlled environment."],
    ["Flowering", "The purple saffron flower blooms, and at the heart of each flower are three red stigmas, which are the saffron."],
    ["Hand-picking", "The stigmas are picked by hand, one by one, by skilled Jordanian hands."],
    ["Drying and packaging", "The stigmas are carefully dried to keep their color and flavor, then packed in jars that protect them until they reach you."],
  ],
};

const whyAeroponics = {
  ar: [
    "حين بدأنا، سألنا أنفسنا: كيف نقدّم زعفرانًا نقيًا بجودة ثابتة في كل موسم؟ وكان الجواب أن نتحكم بكل ما تحتاجه الزهرة بأنفسنا.",
    "في الزراعة الهوائية تنمو الأبصال معلّقة في الهواء، فلا تلامس جذورها التربة، ونغذّيها برذاذ مغذٍّ نحدد مكوناته وكميته بدقة. وتنمو في بيئة مضبوطة بالإضاءة والحرارة والرطوبة، فنتابعها يومًا بيوم. وبما أنه لا تربة، يبقى النبات بعيدًا عن مشاكل التربة المعروفة، وتبقى المياسم نظيفة بعناية.",
    "والنتيجة زعفران بلون أحمر صافٍ ونكهة أصيلة، نقطفه بأيدينا ونجففه بعناية. وعلى كل مرحلة مهندسون أردنيون متخصصون يتابعونها ليبقى مستوى الجودة نفسه في كل عبوة.",
  ],
  en: [
    "When we started, we asked ourselves: how can we offer pure saffron of consistent quality, season after season? The answer was to control everything the flower needs, ourselves.",
    "In aeroponic growing, the bulbs grow suspended in the air, so their roots never touch soil, and we feed them with a nutrient mist whose composition and quantity we set precisely. They grow in a controlled environment of light, temperature and humidity that we monitor day by day. And without soil, the plant stays away from the common problems of soil growing, and the stigmas stay clean and carefully handled.",
    "The result is saffron with a pure red color and authentic flavor, hand-picked and carefully dried. And every stage is followed by specialized Jordanian engineers, so every jar meets the same standard.",
  ],
};

export default async function AboutPage({ params }: LangParams) {
  const lang = await getLang(params);
  return (
    <PageShell lang={lang}>
      <main className="page-main">
        <section className="page-intro about-intro">
          <span className="eyebrow">{lang === "ar" ? "من نحن" : "About us"}</span>
          <h1>
            {lang === "ar" ? (
              <>
                متجذّرون في الأرض،
                <br />
                <em>وقريبون منها دائمًا.</em>
              </>
            ) : (
              <>
                Rooted in the land,
                <br />
                <em>close to it always.</em>
              </>
            )}
          </h1>
        </section>
        <ImageBand
          image={images.saffronFarm}
          alt={lang === "ar" ? "مزرعة الزعفران الهوائية" : "Saffron aeroponic farm"}
        />
        <section className="about-statement">
          <div className="statement-head">
            <span className="eyebrow">
              {lang === "ar" ? "عن الشركة" : "The company"}
            </span>
            <h2>
              {lang === "ar"
                ? "زعفرانكم شركة متخصصة في إنتاج وتسويق الزعفران ومنتجاته."
                : "zafraancom is a company specialized in producing and marketing saffron and its products."}
            </h2>
          </div>
          <div className="statement-body">
            <p>
              {lang === "ar"
                ? "نؤمن أن المنتج الجيد يبدأ من عناية حقيقية بالأرض، وينتهي بتجربة صادقة على طاولتكم."
                : "We believe a good product begins with genuine care for the land and ends with an honest experience on your table."}
            </p>
          </div>
        </section>
        <section className="about-statement" id="story">
          <div className="statement-head">
            <span className="eyebrow">{lang === "ar" ? "قصتنا" : "Our story"}</span>
            <h2>
              {lang === "ar"
                ? "زعفران أردني، بأيدٍ أردنية."
                : "Jordanian saffron, by Jordanian hands."}
            </h2>
          </div>
          <div className="statement-body">
            {story[lang].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="about-statement">
          <div className="statement-head">
            <span className="eyebrow">
              {lang === "ar" ? "طرق الإنتاج" : "Production methods"}
            </span>
            <h2>{lang === "ar" ? "من البصلة إلى العبوة" : "From bulb to jar"}</h2>
          </div>
          <ol className="steps">
            {steps[lang].map(([title, text], index) => (
              <li key={title}>
                <span className="step-number">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="about-statement">
          <div className="statement-head">
            <span className="eyebrow">
              {lang === "ar" ? "لماذا الزراعة الهوائية" : "Why aeroponics"}
            </span>
            <h2>
              {lang === "ar"
                ? "لماذا اخترنا الزراعة الهوائية؟"
                : "Why we chose aeroponics"}
            </h2>
          </div>
          <div className="statement-body">
            {whyAeroponics[lang].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="about-statement">
          <div className="statement-head">
            <span className="eyebrow">{lang === "ar" ? "فريقنا" : "Our team"}</span>
            <h2>
              {lang === "ar"
                ? "وجوه وراء كل عبوة"
                : "The faces behind every jar"}
            </h2>
          </div>
          <div className="statement-body">
            <p>
              {lang === "ar"
                ? "وراء كل عبوة زعفرانكم فريق أردني يجمع خبرة المهندسين المتخصصين وأيدي العاملين في المزرعة، ويتابع كل مرحلة من البصلة حتى العبوة. تعرّفوا على من يقودون العمل:"
                : "Behind every zafraancom jar is a Jordanian team that brings together the expertise of specialized engineers and the hands of the farm workers, following every stage from bulb to jar. Meet the people leading the work:"}
            </p>
          </div>
          <div className="team-grid">
            {team.map((member) => {
              const person = member[lang];
              return (
                <article className="team-card" key={member.id}>
                  <div className="team-card-image">
                    <Image
                      src={member.image}
                      alt={person.name}
                      sizes="(max-width: 760px) 100vw, 33vw"
                    />
                  </div>
                  <h3>{person.name}</h3>
                  <span className="eyebrow">{person.role}</span>
                  <p>{person.bio}</p>
                </article>
              );
            })}
          </div>
        </section>
        <FeatureStrip lang={lang} />
        <section className="vision">
          <div>
            <span className="eyebrow">
              {lang === "ar" ? "رؤيتنا" : "Our vision"}
            </span>
            <h2>
              {lang === "ar" ? (
                <>
                  زعفران محلي
                  <br />
                  <em>طازج طوال العام.</em>
                </>
              ) : (
                <>
                  Fresh local saffron
                  <br />
                  <em>throughout the year.</em>
                </>
              )}
            </h2>
          </div>
          <p>
            {lang === "ar"
              ? "منتجات طبيعية، فاخرة، ذات قيمة غذائية عالية."
              : "Natural, premium products with high nutritional value."}
          </p>
        </section>
        <CTASection lang={lang} />
      </main>
    </PageShell>
  );
}
