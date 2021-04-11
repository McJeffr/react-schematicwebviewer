import * as React from "react";
import { renderSchematic } from "@enginehub/schematicwebviewer";
import "./styles.scss";

const { useState, useEffect } = React;

export interface ISchematicViewerProps {
  jarUrl: string | string[];
  schematic: string;
  id?: string;
  className?: string;
  width?: number;
  height?: number;
  size?: number;
  renderArrow?: boolean;
  renderBars?: boolean;
  orbit?: boolean;
  antialias?: boolean;
  loader?: React.ReactElement;
  backgroundColor?: number | "transparent";
  onLoaded?: () => void;
}

const SchematicViewer: React.FC<ISchematicViewerProps> = ({
  id,
  jarUrl,
  schematic,
  className,
  size = 500,
  width = size ? size : 500,
  height = size ? size : 500,
  renderArrow = false,
  renderBars = false,
  orbit = true,
  antialias = false,
  loader,
  backgroundColor = 0xffffff,
  onLoaded,
}) => {
  const [canvasRef] = useState<React.RefObject<HTMLCanvasElement>>(
    React.createRef<HTMLCanvasElement>()
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!canvasRef?.current) {
      throw new Error("SchematicView's canvas ref is null");
    }
    renderSchematic(canvasRef.current, schematic, {
      size,
      jarUrl,
      renderArrow,
      renderBars,
      orbit,
      antialias,
      backgroundColor,
      loadingSpinner: false,
    }).then(() => {
      setLoading(false);
      if (onLoaded) onLoaded();
    });
  }, [canvasRef, orbit, renderArrow, renderBars, size, width, height, backgroundColor]);

  return (
    <div
      className={"schematic-container" + (className ? " " + className : "")}
      style={{ width, height }}
    >
      <canvas ref={canvasRef} id={id} width={width} height={height}></canvas>
      {loading && loader ? (
        <div className="schematic-loading-container">{loader}</div>
      ) : null}
    </div>
  );
};

export default SchematicViewer;
