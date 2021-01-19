# React SchematicWebViewer

This small package includes a wrapper for the [@enginehub/schematicwebviewer](https://www.npmjs.com/package/@enginehub/schematicwebviewer) package. This package is capable of rendering a Minecraft schematic in a canvas in the browser. More information about the [@enginehub/schematicwebviewer](https://www.npmjs.com/package/@enginehub/schematicwebviewer) package can be found at its own page.

## Usage

**Important: this wrapper component does not install the @enginehub/schematicwebviewer package! You need to also install it alongside this component. See the npm command below.**

Using this wrapper component is fairly easy. You can install it using the following command:

```
npm i --save @enginehub/schematicwebviewer @mcjeffr/react-schematicwebviewer
```

Once installed, you can add the `SchematicViewer` component anywhere in your code to render a schematic:

```tsx
import SchematicViewer from "@mcjeffr/react-schematicwebviewer";

function App() {
  return (
    <div>
      <SchematicViewer
        schematic="base64-data-of-your-schematic"
        jarUrl="url-of-your-minecraft-jar-or-texture-pack-zip"
      />
    </div>
  );
}
```

The `SchematicViewer` takes care of creating a canvas for you to render the schematic in.

The component also supports displaying a custom component when it is loading. Some larger schematics might take a few seconds to load in. Instead of looking at an empty screen, it's much nicer to look at something like a spinner! You can add a component that is displayed whilst the schematic is still loading as follows:

```tsx
import SchematicViewer from "@mcjeffr/react-schematicwebviewer";

function App() {
  return (
    <div>
      <SchematicViewer
        schematic="base64-data-of-your-schematic"
        jarUrl="url-of-your-minecraft-jar-or-texture-pack-zip"
        loader={
          <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <h1
              style={{
                width: "100%",
                textAlign: "center",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              Loading...
            </h1>
          </div>
        }
      />
    </div>
  );
}
```

This code displays "Loading..." in the center of the canvas that is being loaded. Of course, you can be fancy and add an animated spinner, but I'll leave that up to you as everyone has different requirements for this.

## Props

The takes in similar props as the @enginehub/schematicwebviewer's renderSchematic function. Below is a list of all the props that you can use.

- schematic (string): A base64 string containing your schematic data. See the FAQ for more information. Required.
- jarUrl (string): An URL to where you server the Minecraft jar version of your liking. Suggested to use a more recent jar file such as 1.16.5 to have all blocks show up properly. Required.
- id (string?): The ID of the canvas component. Optional.
- className (string?): The CSS class name for the surrounding parent `<div>`. Optional.
- size (number?): The size of the canvas's viewport. Optional, default: 500.
- width (number?): The width of the canvas. In most cases, simply defining "size" is enough. Optional, default: (size ? size : 500).
- height (number?): The height of the canvas. In most cases, simply defining "size" is enough. Optional, default: (size ? size : 500).
- renderArrow (boolean?): Whether or not to render an arrow to show the direction. Optional, default: false.
- renderBars (boolean?): Whether or not to render a grid. Optional, default: false.
- orbit (boolean?): Whether or not to rotate the schematic automatically. Optional, default: true.
- antialias (boolean?): Whether antialiasing should be enabled or not. Optional, default: false.

## FAQ

**Some blocks don't appear to render correctly or I am having other issues with rendering the schematic**

I did not develop the [@enginehub/schematicwebviewer](https://www.npmjs.com/package/@enginehub/schematicwebviewer) package, I only made a tiny React wrapper for it. If you believe the issue is not caused by this wrapper, please report them over at the GitHub repo of schematicwebviewer.

**How do I convert a schematic to a base64 string?**

If you are on Linux, MacOS or Windows with some bash terminal installed (e.g. git bash), you can get the base64 string using `cat your-schematic.schem | base64`.

**What do you mean with `jarUrl`?**

In order to render everything correctly, a texture pack is required. This texture pack can be any modern texture pack. However, since the format of a Minecraft jar is following the same structure, you can also just provide a URL to this instead.

**What value should I input for `jarUrl` then, do you have one for me?**

No, I am not offering a URL for a Minecraft jar. You can possibly find one online. I've done some looking around for you, and maybe you could use `https://launcher.mojang.com/v1/objects/37fd3c903861eeff3bc24b71eed48f828b5269c8/client.jar` for a 1.16.5 jar.

*Disclaimer: I am not responsible for whatever approach you end up using, or explaining how to deal with CORS issues.*

Another approach could be to download or extract the jar file yourself and hosting it at a static URL. You can do this via a method like an [express](https://www.npmjs.com/package/express) server, using `app.use(express.static('public'));`. More info [here](https://expressjs.com/en/starter/static-files.html).

*Disclaimer: I do not endorse doing this, as re-distributing the game's jars might not be allowed. Instead, I'd suggest providing a texture pack that is allowed to be used for these types of projects, provided there is the right attribution. Additionally, proxying the official URLs of Mojang that server the client might be allowed too, but I am no legal expert so it's up to you to do what is right.*

## Disclaimer

I am not affiliated with Mojang A.B. or EngineHub. I do want to thank EngineHub for their amazing library to render schematics on the web.
