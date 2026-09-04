import { useId } from "react";

export function HybridSentimentArchitecture() {
  const markerId = `hybrid-sentiment-arrow-${useId().replace(/:/g, "")}`;

  return (
    <svg
      aria-labelledby="hybrid-sentiment-title hybrid-sentiment-description"
      className="diagram-svg h-auto min-w-[42rem]"
      role="img"
      viewBox="0 0 920 520"
    >
      <title id="hybrid-sentiment-title">
        Hybrid expert fusion architecture
      </title>
      <desc id="hybrid-sentiment-description">
        Tweet text flows through DeBERTa-v3-base into a 768-dimensional
        embedding, then splits into semantic and structural branches before an
        adaptive gate emits the final sentiment probability.
      </desc>
      <defs>
        <marker
          id={markerId}
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
          viewBox="0 0 8 8"
        >
          <path className="diagram-arrow" d="M0 0L8 4L0 8Z" />
        </marker>
      </defs>

      <rect className="diagram-canvas" height="520" rx="18" width="920" />

      <DiagramNode
        height={70}
        label="Tweet"
        type="INPUT"
        width={150}
        x={40}
        y={222}
      />
      <DiagramNode
        accent="blue"
        height={70}
        label="DeBERTa-v3-base"
        type="ENCODER"
        width={180}
        x={230}
        y={222}
      />
      <DiagramNode
        accent="cyan"
        height={70}
        label="768D Embedding"
        type="VECTOR"
        width={170}
        x={450}
        y={222}
      />
      <DiagramNode
        accent="violet"
        height={70}
        label="Structural Features"
        type="STRUCTURAL"
        width={190}
        x={450}
        y={332}
      />
      <DiagramNode
        accent="blue"
        height={70}
        label="KAN Semantic Expert"
        type="MODEL"
        width={190}
        x={680}
        y={112}
      />
      <DiagramNode
        accent="violet"
        height={70}
        label="XGBoost Expert"
        type="MODEL"
        width={190}
        x={680}
        y={332}
      />
      <DiagramNode
        accent="cyan"
        height={76}
        label="Fusion Gate"
        note="mean alpha ≈ 0.98"
        type="FUSION"
        width={180}
        x={520}
        y={32}
      />
      <DiagramNode
        accent="teal"
        height={70}
        label="Final Sentiment Probability"
        type="OUTPUT"
        width={220}
        x={350}
        y={444}
      />

      <DiagramConnector d="M190 257H230" markerId={markerId} />
      <DiagramConnector d="M410 257H450" markerId={markerId} />
      <DiagramConnector
        d="M535 222C535 170 620 147 680 147"
        markerId={markerId}
      />
      <DiagramConnector d="M535 292V332" markerId={markerId} />
      <DiagramConnector d="M640 367H680" markerId={markerId} />
      <DiagramConnector d="M775 112C775 70 720 70 700 70" markerId={markerId} />
      <DiagramConnector
        d="M775 332C775 254 690 92 700 70"
        markerId={markerId}
      />
      <DiagramConnector
        d="M610 108C590 250 530 380 490 444"
        markerId={markerId}
      />

      <text className="diagram-annotation" x="242" y="118">
        SEMANTIC PATH
      </text>
      <text className="diagram-annotation" x="242" y="407">
        STRUCTURAL PATH
      </text>
    </svg>
  );
}

function DiagramNode({
  accent,
  height,
  label,
  note,
  type,
  width,
  x,
  y,
}: {
  accent?: "blue" | "cyan" | "teal" | "violet";
  height: number;
  label: string;
  note?: string;
  type: string;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <g
      className={
        accent ? `diagram-node diagram-node-${accent}` : "diagram-node"
      }
    >
      <rect height={height} rx="14" width={width} x={x} y={y} />
      <text className="diagram-node-type" x={x + 18} y={y + 25}>
        {type}
      </text>
      <text className="diagram-node-label" x={x + 18} y={y + 49}>
        {label}
      </text>
      {note ? (
        <text className="diagram-node-note" x={x + 18} y={y + 66}>
          {note}
        </text>
      ) : null}
    </g>
  );
}

function DiagramConnector({ d, markerId }: { d: string; markerId: string }) {
  return (
    <path
      className="diagram-connector diagram-connector-primary"
      d={d}
      markerEnd={`url(#${markerId})`}
    />
  );
}
